## 步骤

+ 创建数据库迁移

  > npx typeorm migration:create  [位置]

+ 手动添加迁移内容， `up` 必须包含执行迁移所需的代码。 `down` 必须恢复 `up` 所做的更改。 `down` 方法用于恢复上次迁移。 

  > ```js
  > 例如：
  > export class CoffeeRefactor1697685648555 implements MigrationInterface {
  >   public async up(queryRunner: QueryRunner): Promise<void> {
  >     await queryRunner.query(
  >       'ALTER TABLE `coffee` CHANGE COLUMN `name` `title` varchar(255)',
  >     );
  >   }
  > 
  >   public async down(queryRunner: QueryRunner): Promise<void> {
  >     await queryRunner.query(
  >       'ALTER TABLE `coffee` CHANGE COLUMN `title`  `name` varchar(255)',
  >     );
  >   }
  > }
  > ```

+ 运行和恢复迁移

  > ```js
  > npx typeorm migration:run -d path-to-datasource-config
  > ```

##  创建数据库迁移

> + 执行指令 ```npx typeorm migration:create```
>
> **控制台响应**
>
> ```js
> 缺少 non-option 参数：传入了 0 个, 至少需要 1 个
> ```
>
> + **解决办法**
>
> ```js
> npx typeorm migration:create  ./src/migrations/CoffeeRefactor   指定创建[位置]文件
> ```



## 不执行up()迁移文件解决

> + 执行指令 ```yarn typeorm migration:run -d ./dist/ormconfig  ```
>
> **控制台响应**
>
> ```js
> query: SELECT VERSION() AS `version`
> query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'mysql' AND `TABLE_NAME` = 'migrations'
> query: SELECT * FROM `mysql`.`migrations` `migrations` ORDER BY `id` DESC
> No migrations are pending
> ```
>
> + **解决办法**
>
> ```js
> 配置文件（DataSource文件）中指定 明确目录
>     entities: ['dist/src/**/*.entity.js'],
>     migrations: ['dist/src/migrations/*.js'],   // 迁移文件明确目录
> ```