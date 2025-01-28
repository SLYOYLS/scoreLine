const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'score_line',
});

db.connect(err => {
  if (err) {
    console.error('数据库连接失败:', err);
    return;
  }
  console.log('数据库连接成功');
});

app.get('/api/query', (req, res) => {
  // 从请求中提取查询参数
  const { selectedType, schoolId, schoolName, highScore, lowScore, majorName, page = 1, pageSize = 20 } = req.query;

  // 确保 page 和 pageSize 是整数
  const offset = (parseInt(page, 10) - 1) * parseInt(pageSize, 10);

  const allowedTables = ['2024zj', '2024zjyishu', '2024zjtiyu'];

  if (!allowedTables.includes(selectedType)) {
    throw new Error('Invalid table name');
  }

  // 构造 SQL 查询语句
  let sql = `
  SELECT *
  FROM ${selectedType}
  WHERE 1=1
  `;

  const params = [];

  // 根据查询参数动态添加条件
  if (schoolId) {
    sql += ' AND schoolId = ?';
    params.push(schoolId);
  }
  if (schoolName) {
    sql += ' AND schoolName LIKE ?';
    params.push(`%${schoolName}%`);
  }
  if (highScore) {
    sql += 'AND score <= ?';
    params.push(highScore)
  }
  if (lowScore) {
    sql += 'AND score >= ?';
    params.push(lowScore)
  }
  if (majorName) {
    sql += ' AND majorName LIKE ?';
    params.push(`%${majorName}%`);
  }

  // 添加分页逻辑
  sql += ` LIMIT ? OFFSET ?`;
  params.push(parseInt(pageSize, 10));
  params.push(offset);

  // 执行查询
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      return res.status(500).json({ error: '查询失败' });
    }
    res.json(results); // 返回查询结果
  });
});

app.listen(port, () => {
  console.log(`后端服务已启动，监听端口 ${port}`);
});