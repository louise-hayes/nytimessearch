
// function nytSearch() {
$("#searchButton").on("click", function (event) {

    $("#articleContent").empty();

    event.preventDefault();
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=27ee0cab99f04488b45526b7bae42efe";
    var query
    var searchQ = $("#searchTerm").val();
    var limitAmt = $("#noToRetrieve").val();
    var endY = $("#endYear").val();
    var startY = $("#startYear").val();


    if (searchQ === "") {
        alert("Search terms are required.");
        return;
    }

    url += "&q=" + searchQ;

    if (endY !== "") {
        endY = endY + "1231";
        url += "&end_date=" + endY;
    }

    if (startY !== "") {
        startY = startY + "0101";
        url += "&start_date=" + startY;
    }

    if (limitAmt === "") {
        limitAmt = 10;
    }

    url += "&limit=" + limitAmt;

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {

        parseArticles(result, limitAmt);

    }).fail(function (err) {
        throw err;
    });
});

function parseArticles(result, limit) {
    var articleObjects = result.response.docs;
    
    if (limit < articleObjects.length) {
        var articleCount = limit;
    } else {
        var articleCount = articleObjects.length;
    }

    for (var i = 0; i < articleCount; i++) {
        var article = articleObjects[i];

        var articleDiv = $("<div>");

        var articleHeader = $("<h4>").html('<a href="' + article.web_url + '" target=_blank>' + article.headline.main + '</a>');

        var summary = $("<p>").text(article.snippet);
        var pubDate = $("<small style='pull-right';>").html("Published: " + article.pub_date);

        articleDiv.append(articleHeader);
        articleDiv.append(summary);
        articleDiv.append(pubDate);

        if (i > 0) {
            articleDiv.prepend("<hr>");
        }

        $("#articleContent").append(articleDiv);
    }
}