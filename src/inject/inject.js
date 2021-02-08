var send_to = "";

function getMailChimpURLs() {
    // get the ones that are selected

    template_list = document.querySelectorAll("a[data-event-action='Clicked / Template']");
    check_boxes = document.querySelectorAll("input[role='checkbox']");

    check_boxes = Array.from(check_boxes);
    check_boxes.shift();

    urls = [];

    for(var i = 0; i < template_list.length; i++) {
        if(check_boxes[i].getAttribute("aria-checked") == "true") {
            urls.push(template_list[i].href);
        }
    }

    return urls;
}

function findIdFromURL(url) {
    return url.replace(/[a-z]|[A-Z]|[//:.?=]/g, "").replace("5", "");
}

function send_test_template(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', location.origin + "/templates/send-test', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    var url_send = `id=${id}&test-email=${send_to}&login-ids=&include-message=N&notification-ids=`;

    xhr.onload = function() {
        console.log("hopefully a success to:" + send_to);
    }

    xhr.send(url_send);

}

function onBtnClicked() {
    urls = getMailChimpURLs()
    ids = []

    for(var i = 0; i < urls.length; i++) {
        ids.push(findIdFromURL(urls[i]));   
    }

    send_to = prompt("Who Would You Like to Send these Templates To?");
    
    // Encode the url 
    send_to = encodeURIComponent(send_to);

    // "trim" spaces
    send_to = send_to.replace(/ /g, ",");

    if(send_to == "") {
        alert("Invalid input. Please try again.");
    } // check for more edge cases

    else {
        for(var i = 0; i < ids.length; i++) {
            send_test_template(ids[i]);
        }
    }
}

// In order to get started, we'll add a button (to be used as a trigger) Once triggered, we'll prompt for send-to addresses.
function createBtnTrigger() {
    var btn = document.createElement("a");
    
    btn.setAttribute("data-event-category", "Primary");
    btn.setAttribute("role", "button");
    btn.id = "30e7c5839fada82f693fc4128bb46568acdbba6fd64357f4053f0075990f8ac0d591ff708a6b7c1ac279dd7d37";
    btn.text = "Launch Bulk Sender";

    btn.onclick = onBtnClicked;


    btn.classList.add("add-btn")
    btn.classList.add("button")
    btn.classList.add("p0")

    var templateTitle = document.querySelector("h1[class='inline-block-i']")

    templateTitle.insertAdjacentElement("afterend", btn)
}

// It all starts with a button... 
createBtnTrigger()

