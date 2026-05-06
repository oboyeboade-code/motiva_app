import { ENV } from './config.js'

const { QUOTES_API, API_KEY, TIMEOUT, STORAGE_KEY } = ENV
const presentQuote = document.getElementById("presentQuote")
const saveBtn = document.querySelector(".actions button:nth-child(2)")

let newQuote = ""
const turnOffSaveBtn = (bool) => {
    if (saveBtn.disabled === bool) return;
    saveBtn.disabled = bool;
    saveBtn.style.opacity = bool ? 0.5 : 1;
}

const getStorage = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
const setStorage = (quotes) => localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes))
const clearPresentQoute = () => { presentQuote.innerHTML = "" }

const addQuoteToList = (text, removable = false)=> {
    const li = document.createElement("li")
    if (!removable) {
        li.textContent = text
    } else {
        li.style.display = "flex"
        li.style.justifyContent = "space-between"
        li.style.alignItems = "center"

        const quoteSpan = document.createElement("span")
        quoteSpan.textContent = text
        li.appendChild(quoteSpan)

        const removeBtn = document.createElement("button")
        removeBtn.textContent = "Remove"
        removeBtn.classList.add("remove")

        removeBtn.onclick = () => {
            li.remove()
            let savedQuotes = getStorage()
            savedQuotes = savedQuotes.filter(q => q !== text)
            setStorage(savedQuotes)
            if (savedQuotes.length === 0) addQuoteToList("No saved quotes yet!")
        }
        li.appendChild(removeBtn)
    }
    presentQuote.appendChild(li)
}

const fetchQuote = () => {
    turnOffSaveBtn(true)
    clearPresentQoute()
    addQuoteToList("Loading...")

    const timeOutPromise = new Promise((_, reject) =>
        setTimeout(() => {
            return reject(new Error("something went wrong, try again"))
        }, TIMEOUT)
    )

    const fetchPromise = fetch(QUOTES_API, {
        headers: { "X-Api-Key": API_KEY }
    }).then(res => {
        return res.json()
    })

    Promise.race([fetchPromise, timeOutPromise])
        .then(data => {
            newQuote = `${data[0].quote} — ${data[0].author}`
            clearPresentQoute()
            addQuoteToList(newQuote)
        })
        .catch((error) => {
            clearPresentQoute()
            addQuoteToList(error.message)
        })
        .finally(() => {
            turnOffSaveBtn(false)
        })
}

const saveQuote = () => {
    let savedQuotes = getStorage()

    if (!newQuote) {
        clearPresentQoute()
        addQuoteToList("No quote to save!")
        return
    }

    if (savedQuotes.includes(newQuote)) {
        clearPresentQoute()
        addQuoteToList("✅ Quote already saved!")
        return
    }

    savedQuotes.push(newQuote)
    setStorage(savedQuotes)

    clearPresentQoute()
    addQuoteToList(newQuote)
    addQuoteToList("✅ Quote saved!")
}

const showFavQuotes = () => {
    turnOffSaveBtn(true)
    let savedQuotes = getStorage()
    clearPresentQoute()

    if (savedQuotes.length === 0) {
        addQuoteToList("No saved quotes yet!")
        return
    }

    savedQuotes.reverse().forEach(q => addQuoteToList(q, true))
}

const clearStorage = () => {
    turnOffSaveBtn(true)
    if (getStorage().length === 0) {
        clearPresentQoute()
        addQuoteToList("No quotes to clear!")
        return;
    }
    localStorage.removeItem(STORAGE_KEY)
    clearPresentQoute()
    addQuoteToList("All saved quotes have been cleared!")
}

window.onload = () => {
    showFavQuotes()
}

window.saveQuote = saveQuote;
window.fetchQuote = fetchQuote;
window.showFavQuotes = showFavQuotes;
window.clearStorage = clearStorage;