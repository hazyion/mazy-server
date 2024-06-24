import express from 'express';
import type {Request, Response} from 'express';
import dotenv from 'dotenv';
import {model, fileManager} from '../model';

dotenv.config();

export async function getContent(req: Request, res: Response){
  res.status(200).send("Received data");
}

export async function postContent(req: Request, res: Response){
  let data = req.body;
  console.log(data);
  const prompt = "Write a poem about the following text: " + data.prompt;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  // console.log(text);

  res.status(200).send({"result": text});
}

export async function postImage(req: Request, res: Response){
  let files = req.files;
  // console.log(req.headers['content-type']);
  const filename = 'img1.png';
  const uploadRes = await fileManager.uploadFile(`../uploads/${filename}`, {
    mimeType: (files as any)[0].mimetype,
    displayName: "sample image"
  });

  const getResult = await fileManager.getFile(uploadRes.file.name);

  // const result = await model.generateContent([
  //   {
  //     fileData: {
  //       mimeType: getResult.file.mimeType,
  //       fileUri: getResult.file.uri
  //     }
  //   },
  //   { text: "Describe the image with a creative description." },
  // ]);

  res.status(200).send(getResult);
}
