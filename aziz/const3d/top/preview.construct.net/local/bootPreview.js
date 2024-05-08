"use strict";

{
	let messagePort = null;
	let portMessageHandlerFuncs = [];
	let isDebug = false;
	let isDebugFrame = false;
	let isDebugPopout = (window.location.search === "?popout");
	let c3releaseNum = 0;
	
	function AddScriptTag(url, isModule)
	{
		return new Promise((resolve, reject) =>
		{
			const elem = document.createElement("script");
			elem.onload = resolve;
			elem.onerror = reject;
			elem.async = false;		// preserve execution order
			
			if (isModule)
				elem.type = "module";
			
			elem.src = url;
			document.head.appendChild(elem);
		});
	};
	
	function AddStyleSheet(url)
	{
		return new Promise((resolve, reject) =>
		{
			const elem = document.createElement("link");
			elem.onload = resolve;
			elem.onerror = reject;
			elem.rel = "stylesheet";
			elem.href = url;
			document.head.appendChild(elem);
		});
	};
	
	function OnBootMessage(e)
	{
		const data = e.data;
		const type = data.type;
		
		// The window can either be initialised with a messageport first (as done by editor <-> preview bridge),
		// else initialised with a boot message directly (as done by debug frames).
		if (type === "messageport-init")
			OnMessagePortInit(data);
		else if (type === "boot" || type === "boot-debug-frame")
			OnBoot(data);
		else if (type === "register-sw")
			OnRegisterSW();
		else
			console.warn("Unexpected message type '" + type + "'");
	};
	
	function OnMessagePortInit(data)
	{
		// Ignore if already got a message port; will use the first one for communication
		if (messagePort)
			return;
		
		// Set up the message port and post back down it to indicate we're ready.
		messagePort = data.port;
		messagePort.onmessage = OnMessageFromPort;
		messagePort.postMessage({
			"type": "messageport-received"
		});
	};
	
	function OnBoot(data)
	{
		// Start using the transferred port for future communication if one is provided in this message.
		if (data.port && !messagePort)
		{
			messagePort = data.port;
			messagePort.onmessage = OnMessageFromPort;
		}
		
		// Determine settings and save the boot message for the debugger.
		isDebug = !!data.isDebug;					// is debugger frame
		isDebugFrame = !!data.isDebugFrame;			// is game content frame in debugger
		window.c3_isDebugFrame = isDebugFrame;
		c3releaseNum = data.c3releaseNum;
		
		// Register SW for offline support. Note don't do this redundantly inside the debugger frame.
		// This is also done before we change the base href which would alter where sw.js is loaded from.
		if (navigator.serviceWorker && !isDebugFrame)
		{
			navigator.serviceWorker.register("sw.js")
			.then(reg => console.log("Registered service worker on " + reg.scope))
			.catch(err => console.error("Failed to register service worker: ", err));
		}
		
		// Apply the base href first if specified, since it affects where the scripts and styles are loaded from
		const baseHref = data.baseHref || "";
		window.c3_baseHref = baseHref;
		
		if (baseHref)
		{
			const baseElem = document.createElement("base");
			baseElem.setAttribute("href", baseHref);
			document.head.appendChild(baseElem);
		}
		
		// In debug mode save the boot message to pass to any popup windows that are opened
		if (isDebug)
		{
			data.port = null;		// remove private MessagePort, don't pass it to any popup
			window.c3_debugBootMessage = data;
		}
		
		// If any debugger UI markup is provided, append that to the document.
		if (data.debuggerUi)
			document.body.insertAdjacentHTML("beforeend", data.debuggerUi);
		
		// Now proceed to import any scripts and stylesheets specified in the boot message,
		// which will load relative to the base href.
		const promises = [];
		
		for (const url of data.styleUrls)
			promises.push(AddStyleSheet(url));
		
		const isModule = data.isModuleScripts;
		for (const url of data.scriptUrls)
		{
			promises.push(AddScriptTag(url, isModule));
		}
		
		// Once everything's loaded, post the ready message back down the message port.
		Promise.all(promises)
		.then(() =>
		{
			// Initialise debugger if present
			if (window.initDebugger)
				window.initDebugger();
			
			let readyType = "ready";
			
			if (isDebugFrame)
				readyType = "boot-debug-ready";
			else if (isDebugPopout)
				readyType = "debug-popout-ready";
			
			window.c3_postToMessagePort({
				"type": readyType
			});
		});
	};
	
	window.addEventListener("message", OnBootMessage);
	
	// Expose message port communication to other scripts through global functions
	function OnMessageFromPort(e)
	{
		if (!portMessageHandlerFuncs.length)
		{
			console.warn("[Preview] No message handler functions for port message: ", e.data);
			return;
		}
		
		for (const f of portMessageHandlerFuncs)
			f(e.data);
	}
	
	window.c3_addPortMessageHandler = function (f)
	{
		portMessageHandlerFuncs.push(f);
	}
	
	window.c3_postToMessagePort = function (data)
	{
		if (!messagePort)
		{
			console.warn("[Preview] No message port to post data down: ", data);
			return;
		}
		
		messagePort.postMessage(data);
	}
	
	function OnRegisterSW()
	{
		navigator.serviceWorker.register("sw.js")
		.then(reg => console.log("Registered service worker on " + reg.scope))
		.catch(err => console.error("Failed to register service worker: ", err))
		.then(() =>
		{
			// Post to parent indicating SW registered
			const win = (window.opener || window.parent);
		
			if (win && win !== window)
			{
				win.postMessage({
					"type": "sw-registered"
				}, "*");
			}
		});
	};
	
	// When DOM ready, post back a "boot-ready" message to the parent window, if one is available.
	function OnReady()
	{
		const win = (window.opener || window.parent);
		
		if (win && win !== window)
		{
			win.postMessage({
				"type": "boot-ready"
			}, "*");
		}
	};
	
	if (document.readyState === "loading")
		document.addEventListener("DOMContentLoaded", OnReady);
	else
		OnReady();
}