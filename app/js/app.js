'use strict';

var chordizer = angular.module('chordFinderApp', []).run(function($rootScope) {
	
	$rootScope.chordNote;
	$rootScope.chordType;
	$rootScope.scaleNote;
	$rootScope.scaleType;

	$rootScope.GlobalHelpers = {

		createBaseScale: function (rootNoteIndex) {
			var thisScaleSteps = [notes[rootNoteIndex]];
			var nextNoteIndex = rootNoteIndex;
			for(var i = 0; i < scaleSteps.length; i++) {
				nextNoteIndex = nextNoteIndex + scaleSteps[i];
				if(nextNoteIndex >= notes.length) {
					nextNoteIndex = nextNoteIndex - notes.length;
				}
				thisScaleSteps.push(notes[nextNoteIndex]);
			}
			return thisScaleSteps;
		},

		updateChord: function(chordNote, chordType) {
			//console.log(chordNote + ' ' + chordType);
			$rootScope.chordNote = chordNote;
			$rootScope.chordType = chordType
		},

		getChordNotes: function (note, type) {
			var chordFormula;
			var baseNote = note;
			var baseNoteIndex = notes.indexOf(note);
			var notesInChord = [];
			var noteIndexModifier;
			var scaleNotes = $rootScope.GlobalHelpers.createBaseScale(baseNoteIndex);

			for(var i = 0; i < chordTypes.length; i++) {
				if(chordTypes[i].label === type) {
					chordFormula = chordTypes[i].formula;
				}
			}

			for(var i = 0; i < chordFormula.length; i++) {
				if (chordFormula[i].match(/[a-z#]/i)) {
					var noteModifier = chordFormula[i].charAt(0);
					var thisNoteIndex = parseInt(chordFormula[i].substring(1));
					if(thisNoteIndex > scaleNotes.length) {
						thisNoteIndex = thisNoteIndex - scaleNotes.length;
					}
					var thisNote = scaleNotes[thisNoteIndex - 1];
					if(noteModifier === 'b') {
						var thisFlattedNoteIndex = notes.indexOf(thisNote) - 1;
						if(thisFlattedNoteIndex < 0) {
							var updatedFlattedNoteIndex = notes.length + thisFlattedNoteIndex;
						 	notesInChord.push(notes[updatedFlattedNoteIndex]);
						} else {
							notesInChord.push(notes[thisFlattedNoteIndex]);
						}
					}
					if(noteModifier === '#') {
						console.log('#');
						var thisSharpedNote = notes.indexOf(thisNote) + 1;
						//notesInScale.push(notes[thisSharpedNote]);
						if(thisSharpedNote >= notes.length) {
							var updatedSharpedNoteIndex = thisSharpedNote - notes.length;
						 	notesInChord.push(notes[updatedSharpedNoteIndex]);
						} else {
							notesInChord.push(notes[thisSharpedNote]);
						}
					}
				} else {
					var thisNoteIndex = parseInt(chordFormula[i]) - 1;
					if(thisNoteIndex >= scaleNotes.length) {
						thisNoteIndex = thisNoteIndex - scaleNotes.length + 1;
					}
					notesInChord.push(scaleNotes[thisNoteIndex]);
				}
			}
			return notesInChord;
		}

	};

});

var notes = [
	'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'
];

var scaleSteps = [
	2, 2, 1, 2, 2, 2, 1
];

var strings = [
	'E', 'A', 'D', 'G', 'B', 'E'
];

var scaleModes = [
	{
		'label':'Ionian', 
		'formula':['1', '2', '3', '4', '5', '6', '7']
	},
	{
		'label':'Dorian', 
		'formula':['1', '2', 'b3', '4', '5', '6', 'b7']
	},
	{
		'label':'Phrygian', 
		'formula':['1', 'b2', 'b3', '4', '5', 'b6', '7']
	}, 
	{
		'label':'Lydian', 
		'formula':['1', '2', '3', '#4', '5', '6', '7']
	}, 
	{
		'label':'Mixolydian', 
		'formula':['1', '2', '3', '4', '5', '6', 'b7']
	}, 
	{
		'label':'Aeolian', 
		'formula':['1', '2', 'b3', '4', '5', 'b6', 'b7']
	}, 
	{
		'label':'Locrian', 
		'formula':['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7']
	},
	{
		'label':'Melodic Minor', 
		'formula':['1', '2', 'b3', '4', '5', '6', '7']
	},
	{
		'label':'Lydian Dominant', 
		'formula':['1', '2', '3', '#4', '5', '6', 'b7']
	},
	{
		'label':'Harmonic Minor', 
		'formula':['1', '2', 'b3', '4', '5', 'b6', '7']
	}
];

var chordTypes = [
	{
		"label":"maj", "formula":["1", "3", "5"]
	},
	// {
	// 	"label":"add4", "formula":["1", "3", "4", "5"]
	// },
	{
		"label":"6", "formula":["1", "3", "5", "6"]
	},
	{
		"label":"6/9", "formula":["1", "3", "5", "6", "9"]
	},
	{
		"label":"maj7", "formula":["1", "3", "5", "7"]
	},
	{
		"label":"maj9", "formula":["1", "3", "5", "7", "9"]
	},
	// {
	// 	"label":"maj11", "formula":["1", "3", "5", "7", "11"]
	// },
	// {
	// 	"label":"maj13", "formula":["1", "3", "5", "7", "13"]
	// },
	{
		"label":"m", "formula":["1", "b3", "5"]
	},
	// {
	// 	"label":"madd4", "formula":["1", "b3", "4", "5"]
	// },
	{
		"label":"m6", "formula":["1", "b3", "5", "6"]
	},
	{
		"label":"m7", "formula":["1", "b3", "5", "b7"]
	},
	// {
	// 	"label":"madd9", "formula":["1", "b3", "5", "9"]
	// },
	// {
	// 	"label":"m6/9", "formula":["1", "b3", "5", "6", "9"]
	// },
	{
		"label":"m9", "formula":["1", "b3", "5", "b7", "9"]
	},
	// {
	// 	"label":"m11", "formula":["1", "b3", "5", "b7", "11"]
	// },
	// {
	// 	"label":"m13", "formula":["1", "b3", "5", "b7", "13"]
	// },
	{
		"label":"7", "formula":["1" , "3", "5", "b7"]
	},
	{
		"label":"9", "formula":["1" , "3", "5", "b7", "9"]
	},
	{
		"label":"13", "formula":["1" , "3", "5", "b7", "9", "11", "13"]
	},
	// {
	// 	"label":"11", "formula":["1" , "5", "b7", "11"]
	// },
	{
		"label":"dim", "formula":["1" , "b3", "b5"]
	},
	{
		"label":"sus2", "formula":["1" , "2", "9", "5"]
	},
	{
		"label":"sus4", "formula":["1" , "4", "5"]
	},
	{
		"label":"aug", "formula":["1" , "3", "#5"]
	},
	{
		"label":"7b5", "formula":["1", "3", "b5", "b7"]
	},
	{
		"label":"7#5", "formula":["1", "3", "#5", "b7"]
	},
	{
		"label":"m7b5", "formula":["1", "b3", "b5", "b7"]
	},
	{
		"label":"7b9", "formula":["1", "3", "5", "b7", "b9"]
	}	
];
