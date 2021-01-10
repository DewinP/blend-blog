import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("favorite_posts")
export class FavoritePosts extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  postID: string;

  @Column()
  userID: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
