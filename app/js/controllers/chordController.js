'use strict';

chordizer.controller('NoteListCtrl', function ($scope, $http, $rootScope) {

	$scope.notes = notes;
	$scope.notesInChord = [];
	$scope.chordFingeringVariations = [];
	$scope.chordFormula = [];
    $scope.chordTypes = chordTypes;
    $scope.chordNote = $rootScope.chordNote;
    $scope.chordType = $rootScope.chordType;

    $rootScope.$watch("chordNote", function(newValue, oldValue){
    	$scope.chordNote = newValue;
	    $scope.chordDescription();
	});

	$rootScope.$watch("chordType", function(newValue, oldValue){
		$scope.chordType = newValue;
	    $scope.chordDescription();
	});

	$scope.chordDescription = function() {
		if(angular.isUndefined($scope.chordNote) || angular.isUndefined($scope.chordType)) {
			return;
		} else {
	  		var notesInChord = $scope.GlobalHelpers.getChordNotes($scope.chordNote, $scope.chordType);
	  		for(var i = 0; i < chordTypes.length; i++) {
				if(chordTypes[i].label === $scope.chordType) {
					$scope.chordFormula = chordTypes[i].formula;
				}
			}
	  		var chordFingeringVariations = getChordFingeringVariations();
	  		$scope.notesInChord =  notesInChord;
	  		$scope.chordFingeringVariations = chordFingeringVariations;
		}
	};

	function getChordFingeringVariations() {
		//jtab.AddChord("Cmaj11", [ [ 0, [-1 ],  [3,3],  [2,2],  [0  ],  [0  ],  [0  ] ], [ 12, [-1,-1],  [15,4],  [14,3],  [12,1],  [12,1],  [12,1] ] ]);
		var thisChordNote = $scope.chordNote;
		var thisChordType = $scope.chordType;
		if(thisChordType === 'maj') {
			thisChordType = '';
		}
		if(thisChordType === '6/9') {
			thisChordType = '69';
		}
		if(thisChordType === 'm6/9') {
			thisChordType = 'm69';
		}
		if(thisChordNote.match(/[a-z]/i)) {
			thisChordNote = thisChordNote.slice(-2);
		}
		var thisChord = thisChordNote + thisChordType;
		if (typeof jtab.Chords[thisChord] != 'undefined') {
			jtab.render($('#notationContainer'), thisChord + ':1 ' + thisChord + ':2 ' + thisChord + ':3 ' + thisChord + ':4 ');
		} else {
			$('#notationContainer').html('');
		}
		
	};

});