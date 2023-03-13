export interface Post {
  projectTitle: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  stack: Stack;
  technologies: string[];
  yearsOfExperience: string;
}

export enum Stack {
  frontEnd,
  backEnd,
  fullStack,
}

export type Posts = Post[];
