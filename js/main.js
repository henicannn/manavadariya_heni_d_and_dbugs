(() => {
	console.log('lets get this fired');

	// set up the puzzle pieces and boards

	// need a reference to each piece that we want to create
	const thePieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	// get a reference to the drag side
	let piecesBoard = document.querySelector(".puzzle-pieces");
	let puzzleBoard = document.querySelector(".puzzle-board");

	// get a reference to the buttons at the bottom so we can change the puzzle
	let puzzleSelectors = document.querySelectorAll("#buttonHolder img");

	// get a reference to the drop areas
	let dropzones = document.querySelectorAll('.drop-zone');

	// drag functionality 
	// this is a 3-step process
	// First we will add the drag event
	// Second we will add the dragover event
	// Third we will add the drop event
	// dragging sets some data reference ( an audio track name, image source, etc.)
	// dragover -> just prevent the default behaviour
	// on a drop is where the magic happens -> script that behaviour, get the data reference

	function initDrag()
	{
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e){
				console.log('draggin....');
				e.dataTransfer.setData("text/plain", this.id);
				console.log(this.id);
			});
		});
	}


	// drop functionality
	dropzones.forEach(zone =>{
		zone.addEventListener("dragover", function(e){
			e.preventDefault();
			console.log('dragged over me!')
		});

		zone.addEventListener("drop", function(e){
			e.preventDefault();
			console.log('you dropped something on me');

			let piece = e.dataTransfer.getData("text/plain");

			// First Bug is fixed here.
			// line 55, 57, 58, 59, 60, 61, 62(here is code for bug fixing)
			if(zone.innerHTML == ''){
				e.target.appendChild(document.querySelector(`#${piece}`));
				console.log(zone)
			}
			else
			{
				return false;
			}
		});
	});

	function createPuzzlePieces(pictureIndex)
	{
		thePieces.forEach((piece,index) => {
			let newPuzzlePiece = `<img id="piece${index}" class="puzzle-image" src="images/${piece + pictureIndex}.jpg"
			alt="puzzle piece" draggable>`;
			
			piecesBoard.innerHTML += newPuzzlePiece;
			console.log(newPuzzlePiece)			

		});

		//debugger;

		initDrag();
	}

	function resetPuzzlePieces()
	{

		// This changes a current puzzle, and re-generates the pieces
		// debugger;

		// Line 89 to 93 contains code for fixing second bug
		piecesBoard.innerHTML = "";

		dropzones.forEach((e) => {e.innerHTML = ''})

		createPuzzlePieces(this.dataset.puzzleref);
	}

	puzzleSelectors.forEach(button => button.addEventListener("click", resetPuzzlePieces));

	createPuzzlePieces(0);

	// debugger;

})();