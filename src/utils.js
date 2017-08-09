import toTitleCase from 'titlecase';
import _ from 'lodash';

export const titleCase = text => toTitleCase(_.startCase(text))
