import {getCookie} from "../Cookies";

const defaultTheme = {
    navigation : {
        panel : {
            color : '#2b2b2b',
            bg_img : require('../assets/black-background.jpg'),
            title : {
                color : '#FFFFFF',
                font_size : '16px',
            },
            subtitle : {
                color : '#ebebeb',
                font_size : '13px',
            }
        },
        link : {
            text_color : '#FFFFFF'
        },
    },
    content : {
        background_color: '#2b2b2b',
    },
    footer : {
        panel : {
            color : '#212121',
        },
        icon: {
            color : '#ebebeb',
        }
    },
    app : {
        logo : require('../assets/algorithms.png'),
    },
};

const whiteTheme = {
    navigation : {
        panel : {
            color : '#2196F3',
            bg_img : require('../assets/white-background.jpg'),
            title : {
                color : '#2b2b2b',
                font_size : '16px',
            },
            subtitle : {
                color : '#313335',
                font_size : '13px',
            }
        },
        link : {
            text_color : '#FFFFFF'
        },
    },
    content : {
        background_color: '#FFFFFF',
    },
    footer : {
        panel : {
            color : '#E0E0E0',
        },
        icon: {
            color : '#313335',
        }
    },
    app : {
        logo : require('../assets/algorithms.png'),
    },
};


export function getTheme(style = getCookie('theme')){
    let theme;
    if (style === 'white'){
        theme =  whiteTheme
    }
    else{
        theme = defaultTheme
    }
    return theme;
}
