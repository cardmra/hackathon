function uploadFiles() {
    const specFile = document.getElementById('specFile').files[0];
    const outputFile = document.getElementById('outputFile').files[0];
    
    if (!specFile || !outputFile) {
        document.getElementById('status').innerText = 'Both files are required!';
        return;
    }

    const formData = new FormData();
    formData.append('spec', specFile);
    formData.append('output', outputFile);

    fetch('YOUR_API_GATEWAY_URL', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('status').innerText = 'Process started successfully! Process ID: ' + data.process_id;
        pollForResults(data.process_id);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('status').innerText = 'Error starting the process.';
    });
}

function pollForResults(processId) {
    const interval = setInterval(() => {
        fetch(`YOUR_POLLING_API_GATEWAY_URL?id=${processId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'Completed') {
                document.getElementById('status').innerText = 'Process completed: ' + data.data;
                clearInterval(interval);
            } else {
                document.getElementById('status').innerText = 'Processing...';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').innerText = 'Error fetching the results.';
            clearInterval(interval);
        });
    }, 5000); // Poll every 5 seconds
}
