import { Controller, Post, Get, Param, Res, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { diskStorage } from 'multer';
import { UseInterceptors, UploadedFile } from '@nestjs/common';

@Controller('user')
export class UserController {
    // upload images
    @Post()
    @UseInterceptors(
        FileInterceptor('image',
            {
                storage: diskStorage({
                    destination: './images',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            }),
    )
    async uploadFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    @Get(':imgpath')
    seeUploadFile(@Param('imgpath') image, @Res() res) {
        Logger.log(image);
        return res.sendFile(image, { root: './images'});
    }
}
