$(function () {

    //ID generate
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

  
    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete btncolumn').append('<i class="fa fa-trash-o" aria-hidden="true"></i>');
            var $columnAddCard = $('<button>').addClass('add-card').text('+');

            //ADDING EVENTS
            $columnDelete.click(function() {
                self.removeColumn();
            });
            //Add a note after clicking on the button:
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Enter the name of the card")));
                
            });
            $columnTitle.append($columnDelete);
            //CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle)
                    .append($columnAddCard)
                    .append($columnCardList);
            
            //RETURN OF CREATED COLUMN
            return $column;
            }
        }

    //METHOD addCard()
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        //METHOD removeColumn
        removeColumn: function() {
            this.$element.remove();
        }
    };
   
    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard(); //
        // CREATING THE BLOCKS
        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete btncard').text('x');
        // BINDING TO CLICK EVENT
        $cardDelete.click(function(){
            self.removeCard();
        });
        if (self.description === null) {
				return;
			} else if (self.description === "") {
				$card.append($cardDelete)
					.append($cardDescription.text('Untitled card'));
				return $card;
			} else {
				$card.append($cardDelete)
					.append($cardDescription);
				return $card;
			}
        }
    }
   
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    
    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    //drag'n'drop
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

	$('.create-column')
		.click(function() {
			var name = prompt('Enter a column name');
			if (name === null) {
				return;
			} else if (name === "") {
				var column = new Column('Untitled column');
				board.addColumn(column)
			} else {
				var column = new Column(name);
				board.addColumn(column)
			}
		});

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);

});