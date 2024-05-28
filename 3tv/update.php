
if( !localStorage.getItem('bUserAgentFixApplied') && typeof(sAppVersion) === 'string' && (sAppVersion == '2.2.0' || sAppVersion == '2.2.1') ) {
	
	var sFixOldUseragent = getUserAgentSetting();
	if( sFixOldUseragent && sFixOldUseragent.indexOf('m3u-ip.tv') == -1 ) {
		setUserAgentSetting('Mozilla/5.0 (m3u-ip.tv ' + sAppVersion + ') ' + sDeviceFamily);
		localStorage.setItem('bUserAgentFixApplied', sAppVersion);
	}

}
