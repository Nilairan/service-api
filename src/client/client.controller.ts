import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from 'src/auth/dto/login_user.dto';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { BaseResponse } from 'src/common/base-response.dto';
import { Roles } from 'src/role/role-auth.decorator';
import * as baseConfig from './../common/base-config';
import { ClientService } from './client.service';

@Controller(`${baseConfig.baseApi}/client`)
export class ClientController {

	constructor(private clientService: ClientService) {}

    @Get('/:id')
	@Roles(['MANAGER', 'STAFF', 'ADMIN'])
	@UseGuards(RolesGuard)
	async getClientById(@Param('id') clientId: number) {
		return new BaseResponse(await this.clientService.getClientById(clientId))
	}
}
