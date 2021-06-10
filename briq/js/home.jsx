class QuoteGenerator extends React.Component
{
constructor(props)
{
super(props);
this.shownQuotes=[]
this.quotesRating=[]
this.state={"text":"","author":"","ratedQuotes":this.quotesRating}
fetch("https://type.fit/api/quotes").then(response=>response.json()).then(response=>{
var quotes=[]
for(let i=0;i<response.length;++i)
{
quotes.push(response[i]);
}
this.loadData(quotes);
});
}
loadData(quotes)
{
this.quotes=quotes;
this.quotesPerMap=new Map();
for(let i=0;i<this.quotes.length;++i)
{
if(!this.quotesPerMap.has(this.quotes[i]["author"])) this.quotesPerMap.set(this.quotes[i]["author"],[]);
this.quotesPerMap.get(this.quotes[i]["author"]).push(this.quotes[i]["text"]);
}
this.generateRandomQuote();
}
generateRandomQuote()
{
let randomIndex=Math.floor((Math.random() *this.quotes.length));
let text=this.quotes[randomIndex]["text"]
if(this.shownQuotes.includes(text))
{
this.generateRandomQuote();
}
else
{
let author=this.quotes[randomIndex]["author"]
this.shownQuotes.push(text);
this.setState({"text":text,"author":author})
}
}
generateNextQuote()
{
let author=this.state.author;
if(!author || !this.quotesPerMap.get(author)) this.generateRandomQuote();
for(let i=0;i<this.quotesPerMap.get(author).length;++i)
{
let text=this.quotesPerMap.get(author)[i];
if(!this.shownQuotes.includes(text))
{
this.shownQuotes.push(text);
this.setState({"text":text});
return;
}
}
console.log("No available next quote");
console.log("Generating Random");
this.generateRandomQuote();
}
quoteRated(rating)
{
this.quotesRating.push({"text":this.state.text,"rating":rating});
if(rating>=4)
{
console.log("Generating Next Quote");
this.generateNextQuote();
}
else
{
console.log("Generating Random Quote");
this.generateRandomQuote();
}
}
render()
{
return (
<div>
<div>
<center>
<font class="shadowbox" face="Monotype Corsiva" size="8">Quote : {this.state.text}</font>
</center>
<center>
<h2>By : {this.state.author}</h2>
</center>
<h2>Rate : </h2>
<div class="rate">
    <input type="radio" id="star5" name="rate" onClick={()=>{this.quoteRated(5)}} checked={false} value="5" />
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" name="rate" onClick={()=>{this.quoteRated(4)}} checked={false} value="4" />
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" name="rate" onClick={()=>{this.quoteRated(3)}} checked={false} value="3" />
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" name="rate" onClick={()=>{this.quoteRated(2)}} checked={false} value="2" />
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" name="rate" onClick={()=>{this.quoteRated(1)}} checked={false} value="1" />
    <label for="star1" title="text">1 star</label>
</div>
<div id="ratedQuotesModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Quotes</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
		<table class="table table-bordered" id="dataTable1" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Quote</th>
                                                <th>Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.ratedQuotes.map(quote=>{
                                                return(
                                                    <tr>
                                                    <td>{quote.text}</td>
                                                    <td>{quote.rating}</td>
                                                    </tr>
                                                    )
                                                }

                                                )
                                            }

                                        </tbody>
                                    </table>
      </div>
    </div>

  </div>
</div>
</div>
	<div class="buttonStyle">
                <button data-toggle="modal" data-target="#ratedQuotesModal">
                  Rated Quotes
                </button>
	</div>
</div>
);
}
}
