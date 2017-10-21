var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=27ee0cab99f04488b45526b7bae42efe";

function nytSearch() {

    var query 
    var searchQ = $("#searchTerm").val();
    var limitAmt = $("#noToRetrieve").val();
    var endY = $("#endYear").val();
    var startY = $("#startYear").val();

    
    if (searchQ == ""){
        alert("Search terms are required.");
        return;
    }

    url += "&q=" + searchQ;

    if(endY !== ""){
        endY = endY + "1231";
        url += "&end_date=" + endY;
    }

    if(startY !== ""){
        startY = startY + "0101";
        url += "&start_date=" + startY;
    }

    if(limitAmt !== ""){
        limitAmt = 10;
        url += "&limit=" + limitAmt;
    }

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        console.log(result);
    }).fail(function (err) {
        throw err;
    });
}