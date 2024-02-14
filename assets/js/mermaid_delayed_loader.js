mermaid.initialize({ startOnLoad: false });
mermaid.mermaidAPI.initialize();

// Watch the element's attributes for changes
let mermaidObserverOpts = {
    attributes: true
};

tab_element = document.querySelector("#graph-tab");

let observer = new MutationObserver((entries) => {
    let target = entries[0].target;

    // Act only when the tab becomes active
    if (target.classList.contains('active')) {
        // Get the contents of the Mermaid element
        let mermaid_element = document.querySelector("#graph-tab .mermaid")
        let mermaid_code = mermaid_element.textContent;

        // Generate a unique-ish ID so we don't clobber existing graphs
        // This is definitely quick and dirty and could be improved to 
        // avoid collisions when many charts are used
        let id = 'graph-' + Math.floor(Math.random() * Math.floor(1000));

        // Actually render the chart
        mermaid.mermaidAPI.render(id, mermaid_code, content => {
            mermaid_element.innerHTML = content;
        });

        // Disconnect the observer, since the chart is now on the page. 
        // There's no point in continuing to watch it
        observer.disconnect();
    }
});

observer.observe(tab_element, mermaidObserverOpts);

// // Find all Mermaid elements and act on each
// document.querySelectorAll('.mermaid').forEach(function (el) {
//     let observer = new MutationObserver((entries) => {
//         let target = entries[0].target;

//         // Act only when the element becomes visible
//         if (target.classList.contains('active')) {
//             // Get the contents of the Mermaid element
//             let html = el.textContent;

//             // Generate a unique-ish ID so we don't clobber existing graphs
//             // This is definitely quick and dirty and could be improved to 
//             // avoid collisions when many charts are used
//             let id = 'graph-' + Math.floor(Math.random() * Math.floor(1000));

//             // Actually render the chart
//             mermaid.mermaidAPI.render(id, html, content => {
//                 el.innerHTML = content;
//             });

//             // Disconnect the observer, since the chart is now on the page. 
//             // There's no point in continuing to watch it
//             observer.disconnect();
//         }
//     });

//     observer.observe(el, mermaidObserverOpts);
// });
