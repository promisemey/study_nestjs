- nest g co --no-spec 不产生单元测试
- nest g co module/ccc --dry-run 模拟输出

## 装饰器

```
1. @Res() 用于使用原生形式返回状态码
  @Get() // 装饰器
  findAll(@Res() response) {
    response.status(200).send('这是一个GET请求');
    // return '这是一个GET请求';
  }

2. @HttpCode(HttpStatus.CREATED) 返回状态码

3. @Put() 修改操作，修改整个资源

4. @Patch() 修改部分资源
```

```
    await queryRunner.query(
      `alter table "coffee" rename column "title" to "name"`,
    );
```
