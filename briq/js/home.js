class QuoteGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.shownQuotes = [];
        this.quotesRating = [];
        this.state = { "text": "", "author": "", "ratedQuotes": this.quotesRating };
        fetch("https://type.fit/api/quotes").then(response => response.json()).then(response => {
            var quotes = [];
            for (let i = 0; i < response.length; ++i) {
                quotes.push(response[i]);
            }
            this.loadData(quotes);
        });
    }
    loadData(quotes) {
        this.quotes = quotes;
        this.quotesPerMap = new Map();
        for (let i = 0; i < this.quotes.length; ++i) {
            if (!this.quotesPerMap.has(this.quotes[i]["author"])) this.quotesPerMap.set(this.quotes[i]["author"], []);
            this.quotesPerMap.get(this.quotes[i]["author"]).push(this.quotes[i]["text"]);
        }
        this.generateRandomQuote();
    }
    generateRandomQuote() {
        let randomIndex = Math.floor(Math.random() * this.quotes.length);
        let text = this.quotes[randomIndex]["text"];
        if (this.shownQuotes.includes(text)) {
            this.generateRandomQuote();
        } else {
            let author = this.quotes[randomIndex]["author"];
            this.shownQuotes.push(text);
            this.setState({ "text": text, "author": author });
        }
    }
    generateNextQuote() {
        let author = this.state.author;
        if (!author || !this.quotesPerMap.get(author)) this.generateRandomQuote();
        for (let i = 0; i < this.quotesPerMap.get(author).length; ++i) {
            let text = this.quotesPerMap.get(author)[i];
            if (!this.shownQuotes.includes(text)) {
                this.shownQuotes.push(text);
                this.setState({ "text": text });
                return;
            }
        }
        console.log("No available next quote");
        console.log("Generating Random");
        this.generateRandomQuote();
    }
    quoteRated(rating) {
        this.quotesRating.push({ "text": this.state.text, "rating": rating });
        if (rating >= 4) {
            console.log("Generating Next Quote");
            this.generateNextQuote();
        } else {
            console.log("Generating Random Quote");
            this.generateRandomQuote();
        }
    }
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                null,
                React.createElement(
                    "center",
                    null,
                    React.createElement(
                        "font",
                        { "class": "shadowbox", face: "Monotype Corsiva", size: "8" },
                        "Quote : ",
                        this.state.text
                    )
                ),
                React.createElement(
                    "center",
                    null,
                    React.createElement(
                        "h2",
                        null,
                        "By : ",
                        this.state.author
                    )
                ),
                React.createElement(
                    "h2",
                    null,
                    "Rate : "
                ),
                React.createElement(
                    "div",
                    { "class": "rate" },
                    React.createElement("input", { type: "radio", id: "star5", name: "rate", onClick: () => {
                            this.quoteRated(5);
                        }, checked: false, value: "5" }),
                    React.createElement(
                        "label",
                        { "for": "star5", title: "text" },
                        "5 stars"
                    ),
                    React.createElement("input", { type: "radio", id: "star4", name: "rate", onClick: () => {
                            this.quoteRated(4);
                        }, checked: false, value: "4" }),
                    React.createElement(
                        "label",
                        { "for": "star4", title: "text" },
                        "4 stars"
                    ),
                    React.createElement("input", { type: "radio", id: "star3", name: "rate", onClick: () => {
                            this.quoteRated(3);
                        }, checked: false, value: "3" }),
                    React.createElement(
                        "label",
                        { "for": "star3", title: "text" },
                        "3 stars"
                    ),
                    React.createElement("input", { type: "radio", id: "star2", name: "rate", onClick: () => {
                            this.quoteRated(2);
                        }, checked: false, value: "2" }),
                    React.createElement(
                        "label",
                        { "for": "star2", title: "text" },
                        "2 stars"
                    ),
                    React.createElement("input", { type: "radio", id: "star1", name: "rate", onClick: () => {
                            this.quoteRated(1);
                        }, checked: false, value: "1" }),
                    React.createElement(
                        "label",
                        { "for": "star1", title: "text" },
                        "1 star"
                    )
                ),
                React.createElement(
                    "div",
                    { id: "ratedQuotesModal", "class": "modal fade", role: "dialog" },
                    React.createElement(
                        "div",
                        { "class": "modal-dialog" },
                        React.createElement(
                            "div",
                            { "class": "modal-content" },
                            React.createElement(
                                "div",
                                { "class": "modal-header" },
                                React.createElement(
                                    "h4",
                                    { "class": "modal-title" },
                                    "Quotes"
                                ),
                                React.createElement(
                                    "button",
                                    { type: "button", "class": "close", "data-dismiss": "modal" },
                                    "\xD7"
                                )
                            ),
                            React.createElement(
                                "div",
                                { "class": "modal-body" },
                                React.createElement(
                                    "table",
                                    { "class": "table table-bordered", id: "dataTable1", width: "100%", cellspacing: "0" },
                                    React.createElement(
                                        "thead",
                                        null,
                                        React.createElement(
                                            "tr",
                                            null,
                                            React.createElement(
                                                "th",
                                                null,
                                                "Quote"
                                            ),
                                            React.createElement(
                                                "th",
                                                null,
                                                "Rating"
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "tbody",
                                        null,
                                        this.state.ratedQuotes.map(quote => {
                                            return React.createElement(
                                                "tr",
                                                null,
                                                React.createElement(
                                                    "td",
                                                    null,
                                                    quote.text
                                                ),
                                                React.createElement(
                                                    "td",
                                                    null,
                                                    quote.rating
                                                )
                                            );
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { "class": "buttonStyle" },
                React.createElement(
                    "button",
                    { "data-toggle": "modal", "data-target": "#ratedQuotesModal" },
                    "Rated Quotes"
                )
            )
        );
    }
}