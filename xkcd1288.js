//These dudes I know
var elems = document.querySelectorAll("div, p, span, a, li, h1, h2, h3, em, b, caption");

//case insensitive searchWords
var searchWords = [
    'Witnesses',
    'allegedly',
    'NEW STUDY',
    'Rebuild',
    'Space',
    'Google Glass',
    'smartphone',
    'electric',
    'senator',
    'car',
    'Election',
    'Congressional Leaders',
    'Homeland Security',
    'could not be reached for comment'
];

//replaceWords case won't match original, so we capitalize as best as possible.
var replaceWords = [
    'these dudes I know', 
    'kinda probably',
    'Tumblr post',
    'avenge',
    'spaaace',
    'Virtual Boy',
    'Pokédex',
    'atomic',
    'Elf-lord',
    'cat',
    'eating contest',
    'river spirits',
    'Homestar Runner',
    'is guilty and everyone knows it'
];

//function that does the work.
function xkcd1288(){
	var value = newValue = "";
	var replaceRegExp;
	
	var pluralSearchWords = searchWords.slice(0); //clone array
	for(var i in searchWords){
		searchWords[i] = '\\b'+searchWords[i]+'\\b';
	}
	for(var i in pluralSearchWords){
		pluralSearchWords[i] = '\\b'+pluralSearchWords[i]+"(s)?\\b";
	}
	
	for(var i=0; i < elems.length; i++){
		if(!elems[i].firstChild || !elems[i].firstChild.nodeValue){
			continue;
		}
		value = elems[i].firstChild.nodeValue;
	  	if (new RegExp(searchWords.join("|"), 'ig').test(value) || new RegExp(pluralSearchWords.join("|"), 'i').test(value)) {
			//found a match, now figure out which word it was.
			for(var j in searchWords){
				value = elems[i].firstChild.nodeValue;
				if(new RegExp(searchWords[j], 'ig').test(value)){
					newValue = replaceWords[j];
					replaceRegExp = new RegExp(searchWords[j], 'ig');
				}else if(new RegExp(pluralSearchWords[j], 'ig').test(value)){
					newValue = replaceWords[j]+"s";
					replaceRegExp = new RegExp(pluralSearchWords[j], 'ig');
				}else{
					continue;
				}
				elems[i].firstChild.nodeValue = value.replace(replaceRegExp, newValue);
			}
		}
	}
}

//call the function
xkcd1288();

window.onload= function () {
    if(window.addEventListener) {
        document.body.addEventListener('change', xkcd1288, false);
    } else if (window.attachEvent){
        document.body.attachEvent("onchange", xkcd1288);
    }
}
