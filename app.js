// Configurazione di Amplify
Amplify.configure({
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_kL8N2y7F3',
        userPoolWebClientId: '5069s2b9cq7v831uumml4lg4sh'
    }
});

function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    Auth.signIn(email, password)
        .then(user => {
            console.log(user);
            document.getElementById('auth').style.display = 'none';
            document.getElementById('home').style.display = 'block';
        })
        .catch(err => {
            console.error(err);
            alert('Failed to login');
        });
}

function signOut() {
    Auth.signOut()
        .then(data => {
            console.log(data);
            document.getElementById('auth').style.display = 'block';
            document.getElementById('home').style.display = 'none';
        })
        .catch(err => console.error(err));
}

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

    fetch('https://cardmra.github.io/hackathon/', {
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
