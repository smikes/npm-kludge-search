'use strict';

module.exports = function (maintainers) {
    return (maintainers || []).map(function (m) {
        return '=' + m.name;
    }).join(' ');
};
