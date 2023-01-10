export const handleSuccess = async (googleData) => {
    const res = await fetch('http://localhost:4000/auth/google-auth', {
        method: 'POST',
        body: JSON.stringify({
            token: googleData.tokenId,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (res.error) {
        alert(`${res.message}`)
        throw new Error(`${res.message}`)
    }
    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data));
    window.location.reload();
}

export const handleFailure = (res) => {
    alert(JSON.stringify(res));
}