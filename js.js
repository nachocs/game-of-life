function Life() {

}
Life.prototype = {
	initialize: function (maxRows, maxColumns) {
		this.maxRows = maxRows || 20;
		this.maxColumns = maxColumns || 20;
		this.iterations = 0;
		this.genRandomMatrix();
		this.render();
		this.gameOfLife();
	},
	genRandomMatrix: function () {
		var i, j;
		this.matrix = [];
		for (i = 0; i < this.maxRows; i++) {
			this.matrix[i] = [];
			for (j = 0; j < this.maxColumns; j++) {
				this.matrix[i][j] = Math.round(Math.random());
			}
		}
	},
	aliveNeighbours: function (x, y) {
		var x1, y1, x2, y2;
		x1 = x - 1;
		if (x1 < 0) {
			x1 = this.maxRows - 1;
		}
		y1 = y - 1;
		if (y1 < 0) {
			y1 = this.maxColumns - 1;
		}
		x2 = x + 1;
		if (x2 >= this.maxRows) {
			x2 = 0;
		}
		y2 = y + 1;
		if (y2 >= this.maxColumns) {
			y2 = 0;
		}
		return this.matrix[x1][y1] + this.matrix[x1][y] + this.matrix[x1][y2] + this.matrix[x][y1] + this.matrix[x][y2] + this.matrix[x2][y1] + this.matrix[x2][y] + this.matrix[x2][y2];
	},
	gameOfLife: function () {
		var self = this,
			totalmatrix = 0,
			i, j, aliveNeighbours,
			newMatrix = new Array(this.maxRows),
			check = new Array(this.maxRows);
		for (i = 0; i < this.maxRows; i++) {
			newMatrix[i] = new Array(this.maxColumns);
			for (j = 0; j < this.maxColumns; j++) {
				aliveNeighbours = this.aliveNeighbours(i, j);
				if (this.matrix[i][j]) {
					if (aliveNeighbours < 2) {
						newMatrix[i][j] = 0;
					} else if (aliveNeighbours < 4) {
						newMatrix[i][j] = 1;
					} else {
						newMatrix[i][j] = 0;
					}
				} else {
					if (aliveNeighbours === 3) {
						newMatrix[i][j] = 1;
					} else {
						newMatrix[i][j] = 0;
					}
				}
			}
			check[i] = newMatrix[i].reduce(function (a, b) {
				return a + b;
			})
		}
		this.totalmatrix = check.reduce(function (a, b) {
			return a + b;
		})
		this.matrix = newMatrix;
		this.iterations++;
		this.render();
		if (this.totalmatrix !== 0) {
			console.log("total ", totalmatrix);
			setTimeout(function () {
				self.gameOfLife();
			}, 50);
		}
	},
	firstRender: function () {
		var i, j, row, table, caption;
		table = document.createElement('table');
		table.className = "main";
		table.cellPadding = 0;
		table.cellSpacing = 0;
		table.id = "life";
		for (i = 0; i < this.maxRows; i++) {
			row = document.createElement('tr');
			table.appendChild(row);
			for (j = 0; j < this.maxColumns; j++) {
				cell = document.createElement('td');
				row.appendChild(cell);
			}
		}
		document.getElementsByTagName('body')[0].appendChild(table);
		caption = document.createElement('div');
		caption.className = 'caption';
		caption.id = 'caption';
		document.getElementsByTagName('body')[0].appendChild(caption);
		this.firstRendered = true;
	},
	render: function () {
		if (!this.firstRendered) {
			this.firstRender();
		}
		this.printMatrix();
		this.printTotal();
	},
	printTotal: function () {
		document.getElementById('caption').innerHTML = "elements: " + this.totalmatrix + " iterations: " + this.iterations;
	},
	printMatrix: function () {
		var i, j, table, row, cell;
		table = document.getElementById("life");
		for (i = 0; i < this.maxRows; i++) {
			row = table.rows[i];
			for (j = 0; j < this.maxColumns; j++) {
				cell = row.cells[j];
				if (this.matrix[i][j]) {
					cell.style.backgroundColor = "grey";
				} else {
					cell.style.backgroundColor = "white";
				}
			}
		}

	}
}

var life = new Life();
life.initialize(50, 100);
