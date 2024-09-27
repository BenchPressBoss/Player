import { Injectable } from '@nestjs/common'
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'
import * as path from 'path'
import { IResolution, RESOLUTIONS } from './resolution.data'

@Injectable()
export class AppService {
	private _outputDir = './uploads'

	async processVideo(file: Express.Multer.File): Promise<{ message: string }> {
		const originalPath = path.join(this._outputDir, 'original', file.filename)

		await Promise.all(
			RESOLUTIONS.map(resolution => {
				return this._convertVideo(originalPath, resolution, file.filename)
			})
		)

		return { message: 'Video processed successfully' }
	}

	private async _convertVideo(
		inputPath: string,
		resolution: IResolution,
		fileName: string
	) {
		const outputDir = path.join(this._outputDir, resolution.name)
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true })
		}

		const outputPath = path.join(outputDir, fileName)

		return new Promise<void>((resolve, reject) => {
			ffmpeg(inputPath)
				.size(`${resolution.width}x${resolution.height}`)
				.output(outputPath)
				.on('end', () => resolve())
				.on('error', err => reject(err))
				.run()
		})
	}
}
