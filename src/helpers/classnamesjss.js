import classnames from 'classnames';

const classnamesjss = (classes, ...params) => {
  return classnames(...params).split(' ').map((cssClass) => {
    return classes[cssClass];
  }).join(' ');
};

export default classnamesjss;
