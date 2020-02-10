import React, {useState, useEffect} from 'react';

const QuoteBox = () => {

	const [ quote, setQuote ] = useState('')
	const [ author, setAuthor ] = useState('')
	const [ loading, setLoading ] = useState(false)
	const [ allQuotes, setAllQuotes ] = useState([])
	const [ color, setColor ] = useState('#fff')

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


	
  return (
    <div className="quote-wrapper" style={{background: color}}>
		<h3>Famous Quotes</h3>
		<div id="quote-box">
          <p id="text">{quote}</p>
          <p id="author"> - {author}</p>
        </div>
    </div>
  )
}

export default QuoteBox;