$(document).ready(function () {
    var Photos = {};
    var countOfPhotosOnScreen = 0;
    var addToCountOnScrean = 10;

    $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/photos",
        success: function(result)
        {
            for (var i in result)
            {
                Photos[i] = {
                    albumId : result[i].albumId,
                    id : result[i].id,
                    title : result[i].title,
                    url : result[i].url,
                    thumbnailUrl : result[i].thumbnailUrl
                }
            }
        }
    });

    function CreateTable(count, data) {
        var displayResources = $('.display');
        var output="<table><thead><tr><th></th><th>albumId</th>" +
            "<th>id</th><th>title</th><th>url</th><th>thumbnailUrl</th></thead><tbody>";
        for (var i = 0; i < count; i++)
        {
            output+="<tr><th><input type='checkbox'></th><td>" + data[i].albumId + "</td><td>" + data[i].id + "</td><td>"
                + data[i].title + "</td><td>" + data[i].url + "</td><td>" + data[i].thumbnailUrl + "</td></tr>";
        }
        output+="</tbody></table>";
        displayResources.html(output);
        $("table").addClass("table");
    }

    $('.buttonOut').click(function () {
            countOfPhotosOnScreen += addToCountOnScrean;
            CreateTable(countOfPhotosOnScreen, Photos);
        }
    );

    var input = document.getElementById('search');
    input.onkeyup =  input.oncopy = input.onpaste = input.oncut = (function() {
        return function() {
            var table = document.getElementById("display");
            var countSearch = 0;
            var arrayPhotosSearch = {};
            for(var i = 0; i < countOfPhotosOnScreen; i++)
            {
                var flag = true;
                for(var j = 0; j < this.value.length; j++)
                {
                    if(Photos[i].title[j] != this.value[j]) {
                        flag = false;
                    }
                }

                if(flag){
                    arrayPhotosSearch[countSearch] = CloneObjPhotos(Photos[i]);
                    countSearch++;
                }
            }
            table.parentNode.replaceChild(table, CreateTable(countSearch, arrayPhotosSearch));
        }
    })();

    function CloneObjPhotos(obj) {
        var tmpObj = {};
        tmpObj = {
            albumId : obj.albumId,
            id : obj.id,
            title : obj.title,
            url : obj.url,
            thumbnailUrl : obj.thumbnailUrl
        };
        return tmpObj;
    }

    $('.alphabetOrder').click(function () {
        var order = document.getElementById("order");
        order.innerHTML = "A-Z order";
        var tmpPhotos = {};
        for(var k = 0; k < countOfPhotosOnScreen; k++)
        {
            tmpPhotos[k] = CloneObjPhotos(Photos[k]);
        }

        for (var i = 0; i < countOfPhotosOnScreen; i++)
            for (var j = 0; j < countOfPhotosOnScreen - 1; j++)
               if (tmpPhotos[j].title > tmpPhotos[j+1].title) {
                   var tmp = tmpPhotos[j];
                   tmpPhotos[j] = tmpPhotos[j + 1];
                   tmpPhotos[j + 1] = tmp;
               }

        var table = document.getElementById("display");
        table.parentNode.replaceChild(table, CreateTable(countOfPhotosOnScreen, tmpPhotos));
    });

    $('.otherOrder').click(function () {
        var order = document.getElementById("order");
        order.innerHTML = "Z-A order";
        var tmpPhotos = {};
        for(var k = 0; k < countOfPhotosOnScreen; k++)
        {
            tmpPhotos[k] = CloneObjPhotos(Photos[k]);
        }

        for (var i = 0; i < countOfPhotosOnScreen; i++)
            for (var j = 0; j < countOfPhotosOnScreen - 1; j++)
                if (tmpPhotos[j].title < tmpPhotos[j+1].title) {
                    var tmp = tmpPhotos[j];
                    tmpPhotos[j] = tmpPhotos[j + 1];
                    tmpPhotos[j + 1] = tmp;
                }

        var table = document.getElementById("display");
        table.parentNode.replaceChild(table, CreateTable(countOfPhotosOnScreen, tmpPhotos));
    });

    $('.index10').click(function () {
        addToCountOnScrean = 10;
        document.getElementById("count").innerHTML = "10";
    });

    $('.index25').click(function () {
        addToCountOnScrean = 25;
        document.getElementById("count").innerHTML = "25";
    });

    $('.index50').click(function () {
        addToCountOnScrean = 50;
        document.getElementById("count").innerHTML = "50";
    });

    var flagChecked = true;
    $('input').click(function () {
        if(flagChecked)
        {
            $(':checkbox').attr('checked',true);
        }
        else {
            $(':checkbox').attr('checked',false);
        }
        flagChecked = !flagChecked;
    });

    $('.buttonNext').click(function () {
        countOfPhotosOnScreen += addToCountOnScrean;
        var tmpPhotos = {};
        for(var i = countOfPhotosOnScreen, j = 0; i < countOfPhotosOnScreen + addToCountOnScrean; i++, j++)
        {
            tmpPhotos[j] = CloneObjPhotos(Photos[i]);
        }
        var table = document.getElementById("display");
        table.parentNode.replaceChild(table, CreateTable(addToCountOnScrean, tmpPhotos));
    });

    $('.buttonPrevious').click(function () {
        countOfPhotosOnScreen -= addToCountOnScrean;
        var tmpPhotos = {};
        for(var i = countOfPhotosOnScreen, j = 0; i < countOfPhotosOnScreen + addToCountOnScrean; i++, j++)
        {
            tmpPhotos[j] = CloneObjPhotos(Photos[i]);
        }
        var table = document.getElementById("display");
        table.parentNode.replaceChild(table, CreateTable(addToCountOnScrean, tmpPhotos));
    });


});
