const tbody = document.getElementById('card-list-tbody');

async function getCardList() {
    const data = await fetch('./card-list.json');
    return await data.json();
};

function copyText(text){
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'copy-input';
    inputElement.value = text;
    document.body.appendChild(inputElement)
    var copyText = document.getElementById("copy-input");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    document.body.removeChild(copyText)
}

getCardList().then(function(cardList) {
    cardList.forEach(function (cardDetails) {

        var numberHtml = "<span class='CardNumber'>"

        for(let i=0; i < cardDetails["number"].length; i+=4) {
            numberHtml += `<span>${cardDetails["number"].substring(i, i+4)}</span>`;
        }
        numberHtml += "</span>"

        const wrapper = document.createElement("div");
        wrapper.classList.add('card-wrapper');
        const desc = document.createElement('div')
        desc.innerHTML = `<label>Card:</label> <span class="CardBrand">${cardDetails["description"]}</span>`
        wrapper.appendChild(desc);

        const num = document.createElement('div')
        num.innerHTML = `<label>Number:</label> ${numberHtml} <button data-value='${cardDetails["number"]}'>Copy</button>`
        wrapper.appendChild(num);

        document.getElementById('card-list').appendChild(wrapper)
    });

    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(evt){
            copyText(evt.currentTarget.getAttribute('data-value'))
        });
    });
});
