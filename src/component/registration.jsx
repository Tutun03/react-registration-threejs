import React, { useEffect, useState } from 'react';

const Registration = () => {
    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.fontFamily = 'Arial, Helvetica, sans-serif';
        document.body.style.backgroundColor = 'black';
        document.body.style.height = '100vh';
        document.body.style.display = 'flex';
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems = 'center';

        return () => {
            document.body.style = {};
        };
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        enrollment_no: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://code-editor-backend-i9ln.onrender.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Registration successful');
                window.location.href = '/welcome home';
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    };

    const registrationContainerStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(1px)',
        borderRadius: '10px',
        boxShadow: '0 40px 30px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxWidth: '400px',
        width: '100%',
        height: 'auto',
        margin: 'auto',
        color: 'white'
    };

    const registrationBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white'
    };

    const inputContainerStyle = {
        marginBottom: '15px',
        width: '100%'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px'
    };

    const inputStyle = {
        width: '20rem',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    };

    const buttonStyle = {
        padding: '10px 30px',
        border: 'none',
        borderRadius: '20px',
        backgroundColor: 'black',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px'
    };

    return (
        <div style={registrationContainerStyle}>
            <div style={registrationBoxStyle}>
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div style={inputContainerStyle}>
                        <label htmlFor="name" style={labelStyle}>Name</label>
                        <input type="text" id="name" name="name" required style={inputStyle} value={formData.name} onChange={handleChange} />
                    </div>
                    <div style={inputContainerStyle}>
                        <label htmlFor="phone" style={labelStyle}>Phone</label>
                        <input type="text" id="phone" name="phone" required style={inputStyle} value={formData.phone} onChange={handleChange} />
                    </div>
                    <div style={inputContainerStyle}>
                        <label htmlFor="email" style={labelStyle}>Email</label>
                        <input type="email" id="email" name="email" required style={inputStyle} value={formData.email} onChange={handleChange} />
                    </div>
                    <div style={inputContainerStyle}>
                        <label htmlFor="password" style={labelStyle}>Password</label>
                        <input type="password" id="password" name="password" required style={inputStyle} value={formData.password} onChange={handleChange} />
                    </div>
                    <div style={inputContainerStyle}>
                        <label htmlFor="enrollment_no" style={labelStyle}>Enrollment No</label>
                        <input type="text" id="enrollment_no" name="enrollment_no" required style={inputStyle} value={formData.enrollment_no} onChange={handleChange} />
                    </div>
                    <button type="submit" style={buttonStyle}>Success</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
