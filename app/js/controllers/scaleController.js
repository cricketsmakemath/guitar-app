chordizer.controller('ScaleCtrl', function ($scope, $http, $rootScope) {

	$scope.notes = notes;
	$scope.scaleModes = scaleModes;
	$scope.scaleFormula = [];
	$scope.compatiblieChords = [];

	$scope.getScale = function() {
		if(angular.isUndefined($scope.scaleNote) || angular.isUndefined($scope.scaleType)) {
			return;
		} else {
			var baseNoteIndex = notes.indexOf($scope.scaleNote);
			var baseScale = $scope.GlobalHelpers.createBaseScale(baseNoteIndex);
	  		var notesInScale = modifyFirstMode(baseScale, $scope.scaleType);
	  		
	  		$scope.notesInScale =  notesInScale;
	  		$scope.compatiblieChords = getCompatiblieChords(notesInScale);
		}
	};

	$scope.updateChord = function(chordNote, chordType) {
		$rootScope.chordNote = chordNote;
		$rootScope.chordType = chordType;
	};

	function modifyFirstMode(baseModeNotes, mode) {
		var scaleFormula;
		var notesInScale = [];
		var rootNote = baseModeNotes[0];
		var rootNoteIndex = notes.indexOf(rootNote);
		for(var i = 0; i < $scope.scaleModes.length; i++) {
			if($scope.scaleModes[i].label === mode) {
				scaleFormula = $scope.scaleModes[i].formula;
				$scope.scaleFormula = scaleFormula;
			}
		}
		for(var i = 0; i < scaleFormula.length; i++) {
			if (scaleFormula[i].match(/[a-z#]/i)) {
				var noteModifier = scaleFormula[i].charAt(0);
				var thisNoteIndex = parseInt(scaleFormula[i].substring(1));
				if(thisNoteIndex > baseModeNotes.length) {
					thisNoteIndex = thisNoteIndex - baseModeNotes.length;
				}
				var thisNote = baseModeNotes[thisNoteIndex - 1];
				if(noteModifier === 'b') {
					var thisFlattedNoteIndex = notes.indexOf(thisNote) - 1;
					if(thisFlattedNoteIndex < 0) {
						var updatedFlattedNoteIndex = notes.length + thisFlattedNoteIndex;
					 	notesInScale.push(notes[updatedFlattedNoteIndex]);
					} else {
						notesInScale.push(notes[thisFlattedNoteIndex]);
					}
				}
				if(noteModifier === '#') {
					var thisSharpedNote = notes.indexOf(thisNote) + 1;
					//notesInScale.push(notes[thisSharpedNote]);
					if(thisSharpedNote >= notes.length) {
						var updatedSharpedNoteIndex = thisSharpedNote - notes.length;
					 	notesInScale.push(notes[updatedSharpedNoteIndex]);
					} else {
						notesInScale.push(notes[thisSharpedNote]);
					}
				}
			} else {
				var thisNoteIndex = parseInt(scaleFormula[i]) - 1;
				notesInScale.push(baseModeNotes[thisNoteIndex]);
			}
		}
		return notesInScale;
	};

	function getCompatiblieChords(notesInScale) {
		var compatiblieChords = [];
		var notesInCurrentChord = [];
		for(var i = 0; i < notesInScale.length; i++) {
			compatiblieChords[i] = {'note':notesInScale[i], 'chords':[]};
			for(var x = 0; x < chordTypes.length; x++) {
				notesInCurrentChord = $scope.GlobalHelpers.getChordNotes(notesInScale[i], chordTypes[x].label);
				var isMatch = true;
				for(y = 0; y < notesInCurrentChord.length; y++) {
					if(notesInScale.indexOf(notesInCurrentChord[y]) === -1) {
						isMatch = false;
					}
				}
				if(isMatch) {
					compatiblieChords[i].chords.push(chordTypes[x].label);

				}
			}
		}
		return compatiblieChords;
	};

});