import Post from '../models/Post.model.js';

// 새 객체 생성
export function create(req, res) {
	if (!req.body) {
		res.status(400).send({
			status: 400,
			message: 'Content can not be empty!',
		});
	}

	const post = new Post({
		id: req.body.id,
		title: req.body.title,
		content: req.body.content,
		nickname: req.body.nickname,
	});

	// 데이터베이스에 저장
	Post.create(post, (err, data) => {
		if (err) {
			res.status(500).send({
				status: 500,
				message: err.message || 'Some error occured while creating th Post.',
			});
		} else {
			res.send({
				status: 200,
				message: '성공',
				data,
			});
			console.log('create() from postcontroller.js');
		}
	});
}

// 전체 조회
export function findAll(req, res) {
	Post.getAll((err, data) => {
		console.log('postcontroller.js');
		if (err) {
			console.log('error postcontroller.js');
			res.status(500).send({
				status: 500,
				message: err.message || 'Some error occurred while retrieving Post.',
			});
		} else {
			res.send({
				status: 200,
				message: '성공',
				data,
			});
			console.log('findAll() from postcontroller.js');
		}
	});
}

// id로 조회
export function findOne(req, res) {
	Post.findById(req.params.post_idx, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					status: 404,
					message: `Not found Post with id ${req.params.post_idx}.`,
				});
			} else {
				res.status(500).send({
					status: 500,
					message: `Error retrieving Post with id ${req.params.post_idx}`,
				});
			}
		} else {
			res.send({
				status: 200,
				message: '성공',
				data,
			});
			console.log('findOne() from postcontroller.js');
		}
	});
}

// id로 갱신
export function update(req, res) {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			status: 400,
			message: 'Content can not be empty!',
		});
	}

	Post.updateById(req.params.post_idx, new Post(req.body), (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					status: 404,
					message: `Not found Post with id ${req.params.post_idx}.`,
				});
			} else {
				res.status(500).send({
					status: 500,
					message: `Error updating Post with id ${req.params.post_idx}`,
				});
			}
		} else {
			res.send({
				status: 200,
				message: '성공',
				data,
			});
			console.log('updateById() from postcontroller.js');
		}
	});
}

// id로 삭제
export function deleteId(req, res) {
	Post.remove(req.params.post_idx, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Post with id ${req.params.post_idx}.`,
				});
			} else {
				res.status(500).send({
					message: `Could not delete Post with id ${req.params.post_idx}`,
				});
			}
		} else {
			res.send({
				status: 200,
				message: '성공',
				data: {
					post_idx: `${req.params.post_idx}`,
				},
			});
			console.log('deleteId() from postcontroller.js');
		}
	});
}
