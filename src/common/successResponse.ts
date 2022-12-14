
import { STATUS_CODE_200, SUCCESS_MESSAGE } from './constants';

export const successResponse = ({ message = SUCCESS_MESSAGE, statusCode = STATUS_CODE_200, data }) => {
	if (Object.keys(data).length && !Array.isArray(data)) {
		if ("docs" in data) {
			return { message, statusCode, ...data };
		} else {
			return { message, statusCode, object: data };
		}
	}
	if (Array.isArray(data)) {
		return { message, statusCode, docs: data };
	}
}
