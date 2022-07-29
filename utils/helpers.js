module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },

    format_plural: (word, number) => {
        if (number === 1) {
            return word;
        }
        return `${word}s`;
    },

    format_url: url => {
        return url
            .replace('http://', '')
            .replace('https://', '')
            .replace('www.', '')
            //after the initial http:// has been remove, cut off everything
            //after a '/'
            .split('/')[0]
            //cut off everything after a '?'
            .split('?')[0]
    }
}