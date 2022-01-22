import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

const TemplateContext = React.createContext(null);
// for CSS overRiding
export const TemplateProvider = ({children}) => {
    
    const theme = createTheme({
        overrides: {
            MuiDialog: {
                paperWidthSm: {
                    maxWidth: 'unset'
                }
            },
            MuiDialogContent: {
                root: {
                     padding:0,
                    '&:first-child' : {
                        paddingTop: 0,
                        overflow:'hidden'
                        
                    }
                }
            },
            MuiTableCell: {
                root: {
                    borderBottom: 'none'
                }
            }
         }

    });

    return (
        <TemplateContext.Provider value={''}>
           <ThemeProvider theme={theme}>
             <CssBaseline/>
               {children}
           </ThemeProvider>
        </TemplateContext.Provider>
    );
}

export default TemplateProvider;