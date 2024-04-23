const myBooks = []

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }

    const cardContainer = document.getElementById('books-container');

    function searchBook(search) {
        return myBooks.find(({ title }) => title === search);
    }
    
    function searchIndexBook(search) {
        return myBooks.findIndex(({ title }) => title === search);
    }

   
    const addBookToLibrary = (title, author, pages, read) => {
        const newBook = new Book(title, author, pages, read)
        myBooks.push(newBook);
        console.log(myBooks)
        addBookToPage(newBook);
    }


    const addBookToPage = (book) => {
        const card = document.createElement('div');
        const cardTitle = document.createElement('h2');
        const cardAuthor = document.createElement('div');
             const cardBy = document.createElement('div');
        const cardPages = document.createElement('div');
             const cardPageNum = document.createElement('div');
        const cardButtons = document.createElement("div");
	    const cardRead = document.createElement("button");
	    const cardDelete = document.createElement("button");

        card.classList.add('card');
        cardTitle.classList.add('card-title');
        cardAuthor.classList.add('card-author');
        cardPages.classList.add('card-pages');
        cardButtons.classList.add('card-buttons');
        cardRead.classList.add('card-read');
        cardDelete.classList.add('card-delete');

        cardTitle.textContent = book.title;
        cardAuthor.textContent = book.author;
        cardPages.textContent = book.pages;
        if (book.read) {
            cardRead.textContent = "Read";
            cardRead.classList.add("btn-read-marker");
            card.classList.add("card-read-marker");
        } else {
            cardRead.textContent = "Not read";
            cardRead.classList.add("btn-unread-marker");
            card.classList.add("card-unread-marker");
        }
        cardRead.onclick = toggleReadStatus;
        cardDelete.textContent = "Delete";
        cardDelete.onclick = removeBookCard;

        cardBy.textContent = 'By: ' +  cardAuthor.textContent;
        cardPageNum.textContent = `Pages: ${cardPages.textContent}`;
        cardButtons.textContent = ` Status: `;

    
        card.appendChild(cardTitle);
        card.appendChild(cardBy);
        card.appendChild(cardPageNum);
        cardButtons.appendChild(cardRead)
        card.appendChild(cardButtons)
        card.appendChild(cardDelete)

        cardContainer.appendChild(card);
    }

    function resetCardContainer(cardContainer) {
        cardContainer.innerHTML = "";
    }

    function updateCardContainer(cardContainer) {
        resetCardContainer(cardContainer);
        myBooks.forEach(function (book) {
            addBookToPage(book);
        });
    }


    function removeBookCard(e) {
        const targetedCard = e.target.parentNode.firstChild.innerHTML;
    
        const index = searchIndexBook(targetedCard);
        if (index !== -1) {
            myBooks.splice(index, 1);
        }
        updateCardContainer(cardContainer);
    }
    
    function toggleReadStatus(e) {
        const targetedCard = e.target.parentNode.parentNode.firstChild.innerHTML;
    
        const index = searchIndexBook(targetedCard);
        if (index !== -1) {
            myBooks[index].read = !myBooks[index].read;
        }
        updateCardContainer(cardContainer);
    }

    
    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("#cancel-button");
    const addBookButton = document.querySelector(".add-book-button");
    
    addBookButton.addEventListener('click', () => {
        dialog.showModal();
    })

    closeButton.addEventListener("click", () => {
        resetInputValues();
        dialog.close();
    });


    const submitClick = (event) => {
        const titleInput = document.getElementById('book-title').value;
        const authorInput = document.getElementById('book-author').value;
        const pagesInput = document.getElementById('book-pages').value;
        const readInput = document.getElementById('book-read-status');
        const readStatus = readInput.checked ? true : false;
        addBookToLibrary(titleInput, authorInput, pagesInput, readStatus);

	 resetInputValues();
	 event.preventDefault();
	 dialog.close();
    }
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', submitClick, false);

    function resetInputValues() {
        document.querySelector("#book-title").value = "";
        document.querySelector("#book-author").value = "";
        document.querySelector("#book-pages").value = "";
    }
    