const updateTag = Object.freeze({
    Alpha: 0,
    Beta: 1,
    Release: 2
  });
  var keys = Object.keys(updateTag).sort(function(a, b){
    return updateTag[a] - updateTag[b];
});
function SetUpdate(url = null){
    console.log("setting update");
    if(url == null)
    { 
        url = "https://raw.githubusercontent.com/Jadquir/jadquir.github.io/main/test2.txt"; 
    }
    console.log("url : " + url);
    $.get(url,function(data,status){
        const updateJson = JSON.parse(data);
        if(updateJson.UpdateUrl != url){
            SetUpdate(updateJson.UpdateUrl);
            return;
        }
        console.log("updateJson : " + JSON.stringify(updateJson));
        var changelog = updateJson.UpdateChangeLog.reverse();
        
        while (document.querySelector("body > section.changelogs > section").firstChild) {
            document.querySelector("body > section.changelogs > section").removeChild(document.querySelector("body > section.changelogs > section").lastChild);
        }

        for (var i = 0; i < changelog.length; i++) {
            console.log("typeof : " + typeof changelog[i].version);
            console.log(changelog[i].version);            
            let title = changelog[i].version.join(".") + " " + 
            keys[changelog[i].VersionTag] + " | " +
            (new Date(changelog[i].VersionDate))
                .toISOString()
                .split('T')[0]
                .replaceAll('-','.');
            let changelogText =  changelog[i].ChangeLog;
            CreateUpdate(title,changelogText);
        }
        console.log("created");
    })

}

function CreateUpdate(title,changelogText){
    var section = document.createElement("section");
    section.className = "updates";
    
    var div = document.createElement("div");
    div.className = "update";

    var header = document.createElement("header");
    header.innerText = title;

    var changelog = document.createElement("div");
    changelog.className = "changelog";
    changelog.innerText = changelogText;

    div.appendChild(header);
    div.appendChild(changelog);

    document.querySelector("body > section.changelogs > section").appendChild(div);
}