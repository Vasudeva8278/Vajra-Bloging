import { useEffect, useState } from 'react';
import { setUser } from '../utils/auth';

const MainWrapper = ({ children }) => {
    // Initialize the 'loading' state variable and set its initial value to 'true'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define a useEffect hook to handle side effects after component mounting
    useEffect(() => {
        // Define an asynchronous function 'handler'
        const handler = async () => {
            try {
                // Set the 'loading' state to 'true' to indicate the component is loading
                setLoading(true);

                // Perform an asynchronous user authentication action
                await setUser();
            } catch (err) {
                console.error('Auth initialization error:', err);
                setError(err);
            } finally {
                // Set the 'loading' state to 'false' to indicate the loading process has completed
                setLoading(false);
            }
        };

        // Call the 'handler' function immediately after the component is mounted
        handler();
    }, []);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    if (error) {
        console.log('Rendering despite error to allow access to public routes');
    }

    // Render content conditionally based on the 'loading' state
    return <>{children}</>;
};

export default MainWrapper;
