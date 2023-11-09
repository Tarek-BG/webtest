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
			"house": "Lannister"
		},
		{
			"name": "Brienne of Tarth",
			"shortCode": "brienne",
			"actor": "Gwendoline Christie",
			"house": "Tarth"
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
			"location": ""
		},
		{
			"name": "Daenerys Targaryen",
			"shortCode": "dany",
			"actor": "Emilia Clarke",
			"house": "Targaryen",
			"location": "Mereen"
		},
		{
			"name": "King Joffrey Baratheon",
			"shortCode": "joffrey",
			"actor": "Jack Gleeson",
			"house": "Baratheon",
			"Whereabouts": "Kings Landing"
		}	
	]
}

$(document).ready(function(){
	var characterTemplate = $("#character-template").html();

	var compiledCharacterTemplate = Handlebars.compile(characterTemplate);

	$(".character-list-container").html(compiledCharacterTemplate(cast));

});





