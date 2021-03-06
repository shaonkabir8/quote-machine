import React, {useState, useEffect} from 'react';
import '../styles.css'
const QuoteBox = () => {

	const [ quote, setQuote ] = useState('')
	const [ author, setAuthor ] = useState('')
	const [ loading, setLoading ] = useState(false)
	const [ allQuotes, setAllQuotes ] = useState([])
	const [ color, setColor ] = useState('#00cf5d')

	useEffect(() => {
		fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
		.then(res => res.json())
		.then(data => {
			setQuote(data.quotes[0].quote);
			setAuthor(data.quotes[0].author);
			setAllQuotes(data.quotes);

		})
		.catch(err => {
			console.log(err);
		});
	}, [])

	
	// Generate new Quotes
	const generateNewQuote = () => {
	    const newQuote = [];
	    let randomNumber = Math.floor((Math.random() * allQuotes.length) + 1);

		
		allQuotes.map((quote,index) => {	
	      if(index === randomNumber) {
	        newQuote.push(quote)
	      }
		})
		
	    setQuote(newQuote[0].quote)
	    setAuthor(newQuote[0].author);
  	}
	
	// Change Background Color
	const changeBackgroundColor = () => {
		// found on https://codepen.io/bekza/pen/ALdZmV?editors=1010
		const letters = '0123456789ABCDEF';
	    let colorHexCode = '#';
	    for (let i = 0; i < 6; i++ ) {
		  colorHexCode += letters[Math.floor(Math.random() * 16)];
	    }
	    setColor(colorHexCode);

	}


	// Click Handler
	const nextQuoteHandler = () => {
		generateNewQuote();
		changeBackgroundColor();
	}

	// Share on Twitter
	const shareOnTwitter = () => {
	    // found on https://gist.github.com/McKinneyDigital/2884508#file-share-twitter-js
	    const url = "twitter.com";
	    const text = `${author} - "${quote}"`
	    window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
	}


  return (
	    <div id="main" style={{background: color}}>
			<h3 id="title">Famous Quotes</h3>
			<div id="quote-box">
	          <p id="text">{quote}</p>
	          <p id="author"> - {author}</p>
	          <button id="twitter-share" className="boxed-btn" onClick={shareOnTwitter}>Tweet</button>
	          <button id="new-quote" className="boxed-btn" onClick={nextQuoteHandler}>New Quote</button>
	        </div>
	    </div>
  )
}

export default QuoteBox;