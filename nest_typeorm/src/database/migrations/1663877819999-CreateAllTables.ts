// CreateAllTables.ts
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAllTables1663877819999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create 'movies' table
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'text' },
          { name: 'duration', type: 'int' },
          // Add other columns as needed
        ],
      }),
    );

    // Create 'cinemas' table
    await queryRunner.createTable(
      new Table({
        name: 'cinemas',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'location', type: 'varchar' },
          { name: 'capacity', type: 'int' },
          // Add other columns as needed
        ],
      }),
    );

    // Create 'shows' table
    await queryRunner.createTable(
      new Table({
        name: 'shows',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'startTime', type: 'timestamp' },
          { name: 'movieId', type: 'int' },
          { name: 'cinemaId', type: 'int' },
          { name: 'roomNumber', type: 'varchar' },
          // Add other columns as needed
        ],
      }),
    );

    // Create 'prices' table
    await queryRunner.createTable(
      new Table({
        name: 'prices',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'price', type: 'int' },
          { name: 'seatType', type: 'varchar' },
          { name: 'percentagePremium', type: 'int' },
          { name: 'showId', type: 'int' },
          // Add other columns as needed
        ],
      }),
    );

    // Create 'seats' table
    await queryRunner.createTable(
      new Table({
        name: 'seats',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'showId', type: 'int' },
          { name: 'seatNumber', type: 'varchar' },
          { name: 'isAvailable', type: 'boolean', default: true },
          { name: 'seatType', type: 'varchar' },
          // Add other columns as needed
        ],
      }),
    );

    // Define foreign key relationships
    await queryRunner.createForeignKey(
      'shows',
      new TableForeignKey({
        columnNames: ['movieId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'shows',
      new TableForeignKey({
        columnNames: ['cinemaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cinemas',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'prices',
      new TableForeignKey({
        columnNames: ['showId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shows',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'seats',
      new TableForeignKey({
        columnNames: ['showId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shows',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('seats');
    await queryRunner.dropTable('prices');
    await queryRunner.dropTable('shows');
    await queryRunner.dropTable('cinemas');
    await queryRunner.dropTable('movies');
  }
}
