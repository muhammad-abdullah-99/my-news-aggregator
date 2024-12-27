import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => {
    return (
        <footer style={{ marginTop: '2rem', padding: '1rem 0', backgroundColor: '#f5f5f5' }
        }>
            <Container maxWidth="lg" >
                <Typography variant="body2" color="textSecondary" align="center" >
                    © {new Date().getFullYear()} News Aggregator
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;