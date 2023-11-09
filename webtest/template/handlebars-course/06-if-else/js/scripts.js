var cast = {
	"characters": [
		{
			"name": "Jon Snow",
			"shortCode": "jon-snow",
			"actor": "Kit Harrington",
			"house": "Stark",
			"location": "The Wall"
		},
		{
			"name": "Tyrion Lannister",
			"shortCode": "tyrion",
			"actor": "Peter Dinklage",
			"house": "Lannister",
			"location": undefined
		},
		{
			"name": "Brienne of Tarth",
			"shortCode": "brienne",
			"actor": "Gwendoline Christie",
			"house": "Tarth",
			"location": null
		},
		{
			"name": "Eddard Stark",
			"shortCode": "ned-stark",
			"actor": "Sean Bean",
			"house": "Stark"
		},
		{
			"name": "Sandor Clegane",
			"shortCode": "the-hound",
			"actor": "Rory McCann",
			"location": false
		},{
			"name": "Daenerys Targaryen",
			"shortCode": "dany",
			"actor": "Emilia Clarke",
			"house": "Targaryen",
			"location": "Mereen"
		}
	]
}

$(document).ready(function(){
	var characterTemplate = $("#character-template").html();

	var compiledCharacterTemplate = Handlebars.compile(characterTemplate);

	$(".character-list-container").html(compiledCharacterTemplate(cast));

});





