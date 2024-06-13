// import React, { useEffect, useRef } from 'react';
// const TranslateComponent = () => {
//     const google TranslateRef useRef(null);
//     useEffect(() => {
//         let intervalId;
//         const checkGoogleTranslate () => {
//             if (window.google && window.google.translate) {
// clear Interval(intervalId);
//                 new window.google.translate.TranslateElement(
//                     { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
//                     googleTranslateRef.current
//                 );
//             }
//         };
//         intervalId = setInterval(checkGoogle Translate, 100);
//     }, []);
// call the ref with null if you passed a callback ref).
//     return (
//         <div>
//             <div ref={google TranslateRef}></div>
// </div >
// );
// };
// export default TranslateComponent;



import React, { useEffect, useRef } from 'react';

const TranslateComponent = () => {
    const googleTranslateRef = useRef(null);

    useEffect(() => {
        let intervalId;
        
        const checkGoogleTranslate = () => {
            if (window.google && window.google.translate) {
                clearInterval(intervalId);
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
                    googleTranslateRef.current
                );
            }
        };
        
        intervalId = setInterval(checkGoogleTranslate, 100);
        
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div ref={googleTranslateRef}></div>
        </div>
    );
};

export default TranslateComponent;
