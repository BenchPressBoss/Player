import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as multer from 'multer'
import * as path from 'path'
import { AppService } from './app.service'

@Controller('/api/upload')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('video', {
			storage: multer.diskStorage({
				destination: './uploads/original',
				filename: (req, file, cb) => {
					const uniqueSuffix =
						Date.now() + '-' + Math.round(Math.random() * 1e9)

					const fileExtName = path.extname(file.originalname)
					cb(null, `${uniqueSuffix}${fileExtName}`)
				}
			})
		})
	)
	uploadVideo(@UploadedFile() file: Express.Multer.File) {
		return this.appService.processVideo(file)
	}
}
