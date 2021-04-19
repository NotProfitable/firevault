import { ObjectId } from 'bson';

export type projectType = {
	projectName: string;
	description: string;
	_id: any;
	databases: Array<Database>;
	timestamp: string;
};

export type Database = {
	name: string;
	type: string;
	url: string;
};
