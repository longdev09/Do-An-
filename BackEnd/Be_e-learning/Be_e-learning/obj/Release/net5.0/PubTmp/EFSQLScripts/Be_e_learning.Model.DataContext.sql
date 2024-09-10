IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE TABLE [DanhMuc] (
        [maDm] varchar(255) NOT NULL,
        [tenDm] nvarchar(255) NULL,
        CONSTRAINT [PK_DanhMuc] PRIMARY KEY ([maDm])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE TABLE [VaiTro] (
        [maVt] varchar(255) NOT NULL,
        [tenVt] nvarchar(50) NULL,
        CONSTRAINT [PK_VaiTro] PRIMARY KEY ([maVt])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE TABLE [NguoiDung] (
        [maNg] varchar(255) NOT NULL,
        [tenDn] nvarchar(255) NULL,
        [matKhau] nvarchar(255) NULL,
        [maVt] varchar(255) NULL,
        CONSTRAINT [PK_NguoiDung] PRIMARY KEY ([maNg]),
        CONSTRAINT [FK_nguoiDung_vaiTro] FOREIGN KEY ([maVt]) REFERENCES [VaiTro] ([maVt]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE TABLE [GiangVien] (
        [maGv] varchar(255) NOT NULL,
        [tenGv] nvarchar(255) NULL,
        [ngaySinh] date NULL,
        [phai] nvarchar(10) NULL,
        [sdt] nvarchar(11) NULL,
        [email] nvarchar(255) NULL,
        [maNg] varchar(255) NULL,
        CONSTRAINT [PK_GiangVien] PRIMARY KEY ([maGv]),
        CONSTRAINT [FK_giangVien_nguoiDung] FOREIGN KEY ([maNg]) REFERENCES [NguoiDung] ([maNg]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE TABLE [KhoaHoc] (
        [maKh] varchar(255) NOT NULL,
        [tenKh] nvarchar(255) NULL,
        [gia] real NULL,
        [hinh] nvarchar(255) NULL,
        [gioiThieu] nvarchar(255) NULL,
        [trangThai] nvarchar(255) NULL,
        [ketQuaDatDuoc] nvarchar(255) NULL,
        [maGv] varchar(255) NULL,
        [maDm] varchar(255) NULL,
        CONSTRAINT [PK_KhoaHoc] PRIMARY KEY ([maKh]),
        CONSTRAINT [FK_khoaHoc_danhmuc] FOREIGN KEY ([maDm]) REFERENCES [DanhMuc] ([maDm]) ON DELETE NO ACTION,
        CONSTRAINT [FK_khoaHoc_giangVien] FOREIGN KEY ([maGv]) REFERENCES [GiangVien] ([maGv]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE TABLE [ChuongKhoaHoc] (
        [maCh] varchar(255) NOT NULL,
        [maKh] varchar(255) NULL,
        [tenChuong] nvarchar(255) NULL,
        [stt] int NOT NULL,
        CONSTRAINT [PK_ChuongKhoaHoc] PRIMARY KEY ([maCh]),
        CONSTRAINT [FK_ChuongKhoaHoc_khoaHoc] FOREIGN KEY ([maKh]) REFERENCES [KhoaHoc] ([maKh]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE TABLE [NoiDungChuong] (
        [maNd] varchar(255) NOT NULL,
        [tieuDe] varchar(255) NULL,
        [moTa] varchar(255) NULL,
        [stt] int NOT NULL,
        [maCh] varchar(255) NULL,
        CONSTRAINT [PK_NoiDungChuong] PRIMARY KEY ([maNd]),
        CONSTRAINT [FK_NoidungChuong_ChuongKhoaHoc] FOREIGN KEY ([maCh]) REFERENCES [ChuongKhoaHoc] ([maCh]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE TABLE [BaiGiang] (
        [maBg] nvarchar(450) NOT NULL,
        [video] varchar(255) NULL,
        [maNd] varchar(255) NULL,
        CONSTRAINT [PK_BaiGiang] PRIMARY KEY ([maBg]),
        CONSTRAINT [FK_BaiGiang_NoiDungChuong] FOREIGN KEY ([maNd]) REFERENCES [NoiDungChuong] ([maNd]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_BaiGiang_maNd] ON [BaiGiang] ([maNd]) WHERE [maNd] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE INDEX [IX_ChuongKhoaHoc_maKh] ON [ChuongKhoaHoc] ([maKh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE INDEX [IX_GiangVien_maNg] ON [GiangVien] ([maNg]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE INDEX [IX_KhoaHoc_maDm] ON [KhoaHoc] ([maDm]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE INDEX [IX_KhoaHoc_maGv] ON [KhoaHoc] ([maGv]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE INDEX [IX_NguoiDung_maVt] ON [NguoiDung] ([maVt]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    CREATE INDEX [IX_NoiDungChuong_maCh] ON [NoiDungChuong] ([maCh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240409140327_addNoiDung_BaiGiang')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240409140327_addNoiDung_BaiGiang', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410031942_update')
BEGIN
    DROP TABLE [BaiGiang];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410031942_update')
BEGIN
    DROP TABLE [NoiDungChuong];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410031942_update')
BEGIN
    CREATE TABLE [LoaiNoiDung] (
        [maLoaiNd] varchar(255) NOT NULL,
        [tenLoai] varchar(255) NULL,
        CONSTRAINT [PK_LoaiNoiDung] PRIMARY KEY ([maLoaiNd])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410031942_update')
BEGIN
    CREATE TABLE [NoiDung] (
        [maNd] varchar(255) NOT NULL,
        [tieuDe] varchar(255) NULL,
        [moTa] varchar(255) NULL,
        [stt] int NOT NULL,
        [maCh] varchar(255) NULL,
        [maLoaiNd] varchar(255) NULL,
        CONSTRAINT [PK_NoiDung] PRIMARY KEY ([maNd]),
        CONSTRAINT [FK_Noidung_ChuongKhoaHoc] FOREIGN KEY ([maCh]) REFERENCES [ChuongKhoaHoc] ([maCh]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Noidung_LoaiNoiDung] FOREIGN KEY ([maCh]) REFERENCES [LoaiNoiDung] ([maLoaiNd]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410031942_update')
BEGIN
    CREATE TABLE [Video] (
        [maVideo] varchar(255) NOT NULL,
        [video] varchar(255) NULL,
        [maNd] varchar(255) NULL,
        CONSTRAINT [PK_Video] PRIMARY KEY ([maVideo]),
        CONSTRAINT [FK_Video_NoiDung] FOREIGN KEY ([maNd]) REFERENCES [NoiDung] ([maNd]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410031942_update')
BEGIN
    CREATE INDEX [IX_NoiDung_maCh] ON [NoiDung] ([maCh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410031942_update')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_Video_maNd] ON [Video] ([maNd]) WHERE [maNd] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410031942_update')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240410031942_update', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410032708_update_nvarchar')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[NoiDung]') AND [c].[name] = N'tieuDe');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [NoiDung] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [NoiDung] ALTER COLUMN [tieuDe] nvarchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410032708_update_nvarchar')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[NoiDung]') AND [c].[name] = N'moTa');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [NoiDung] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [NoiDung] ALTER COLUMN [moTa] nvarchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410032708_update_nvarchar')
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[LoaiNoiDung]') AND [c].[name] = N'tenLoai');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [LoaiNoiDung] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [LoaiNoiDung] ALTER COLUMN [tenLoai] nvarchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240410032708_update_nvarchar')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240410032708_update_nvarchar', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240412144143_upadte')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240412144143_upadte', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240412150947_UPDATE2')
BEGIN
    ALTER TABLE [NoiDung] DROP CONSTRAINT [FK_Noidung_LoaiNoiDung];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240412150947_UPDATE2')
BEGIN
    CREATE INDEX [IX_NoiDung_maLoaiNd] ON [NoiDung] ([maLoaiNd]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240412150947_UPDATE2')
BEGIN
    ALTER TABLE [NoiDung] ADD CONSTRAINT [FK_Noidung_LoaiNoiDung] FOREIGN KEY ([maLoaiNd]) REFERENCES [LoaiNoiDung] ([maLoaiNd]) ON DELETE NO ACTION;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240412150947_UPDATE2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240412150947_UPDATE2', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240416070554_updata-video')
BEGIN
    EXEC sp_rename N'[Video].[video]', N'videoUlr', N'COLUMN';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240416070554_updata-video')
BEGIN
    ALTER TABLE [Video] ADD [ngay] date NOT NULL DEFAULT '0001-01-01';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240416070554_updata-video')
BEGIN
    ALTER TABLE [Video] ADD [tenFile] nvarchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240416070554_updata-video')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240416070554_updata-video', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422035738_updataGiangVien')
BEGIN
    ALTER TABLE [GiangVien] ADD [avata] varchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422035738_updataGiangVien')
BEGIN
    ALTER TABLE [GiangVien] ADD [linhVuc] nvarchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422035738_updataGiangVien')
BEGIN
    ALTER TABLE [GiangVien] ADD [matSauCccd] varchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422035738_updataGiangVien')
BEGIN
    ALTER TABLE [GiangVien] ADD [matTruocCccd] varchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422035738_updataGiangVien')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240422035738_updataGiangVien', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422055303_updateKeyGiangVien')
BEGIN
    DROP INDEX [IX_GiangVien_maNg] ON [GiangVien];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422055303_updateKeyGiangVien')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_GiangVien_maNg] ON [GiangVien] ([maNg]) WHERE [maNg] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422055303_updateKeyGiangVien')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240422055303_updateKeyGiangVien', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422060108_updateTrangThai')
BEGIN
    ALTER TABLE [NguoiDung] ADD [trangThai] nvarchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240422060108_updateTrangThai')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240422060108_updateTrangThai', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240502101023_capNhat')
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[KhoaHoc]') AND [c].[name] = N'ketQuaDatDuoc');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [KhoaHoc] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [KhoaHoc] ALTER COLUMN [ketQuaDatDuoc] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240502101023_capNhat')
BEGIN
    DECLARE @var4 sysname;
    SELECT @var4 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[KhoaHoc]') AND [c].[name] = N'gioiThieu');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [KhoaHoc] DROP CONSTRAINT [' + @var4 + '];');
    ALTER TABLE [KhoaHoc] ALTER COLUMN [gioiThieu] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240502101023_capNhat')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240502101023_capNhat', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503074208_cap-nhat-ten-noidung-baigiang')
BEGIN
    ALTER TABLE [Video] DROP CONSTRAINT [FK_Video_NoiDung];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503074208_cap-nhat-ten-noidung-baigiang')
BEGIN
    DROP TABLE [NoiDung];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503074208_cap-nhat-ten-noidung-baigiang')
BEGIN
    CREATE TABLE [BaiGiang] (
        [maBg] varchar(255) NOT NULL,
        [tieuDe] nvarchar(255) NULL,
        [moTa] nvarchar(255) NULL,
        [stt] int NOT NULL,
        [maCh] varchar(255) NULL,
        [maLoaiNd] varchar(255) NULL,
        CONSTRAINT [PK_BaiGiang] PRIMARY KEY ([maBg]),
        CONSTRAINT [FK_BaiGiang_ChuongKhoaHoc] FOREIGN KEY ([maCh]) REFERENCES [ChuongKhoaHoc] ([maCh]) ON DELETE NO ACTION,
        CONSTRAINT [FK_BaiGiang_LoaiNoiDung] FOREIGN KEY ([maLoaiNd]) REFERENCES [LoaiNoiDung] ([maLoaiNd]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503074208_cap-nhat-ten-noidung-baigiang')
BEGIN
    CREATE INDEX [IX_BaiGiang_maCh] ON [BaiGiang] ([maCh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503074208_cap-nhat-ten-noidung-baigiang')
BEGIN
    CREATE INDEX [IX_BaiGiang_maLoaiNd] ON [BaiGiang] ([maLoaiNd]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503074208_cap-nhat-ten-noidung-baigiang')
BEGIN
    ALTER TABLE [Video] ADD CONSTRAINT [FK_Video_NoiDung] FOREIGN KEY ([maNd]) REFERENCES [BaiGiang] ([maBg]) ON DELETE NO ACTION;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503074208_cap-nhat-ten-noidung-baigiang')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240503074208_cap-nhat-ten-noidung-baigiang', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503092355_capNhatMota')
BEGIN
    DECLARE @var5 sysname;
    SELECT @var5 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[BaiGiang]') AND [c].[name] = N'moTa');
    IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [BaiGiang] DROP CONSTRAINT [' + @var5 + '];');
    ALTER TABLE [BaiGiang] ALTER COLUMN [moTa] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503092355_capNhatMota')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240503092355_capNhatMota', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503094708_cap')
BEGIN
    ALTER TABLE [Video] DROP CONSTRAINT [FK_Video_NoiDung];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503094708_cap')
BEGIN
    DROP TABLE [BaiGiang];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503094708_cap')
BEGIN
    CREATE TABLE [NoiDung] (
        [maNd] varchar(255) NOT NULL,
        [tieuDe] nvarchar(255) NULL,
        [moTa] nvarchar(max) NULL,
        [stt] int NOT NULL,
        [maCh] varchar(255) NULL,
        [maLoaiNd] varchar(255) NULL,
        CONSTRAINT [PK_NoiDung] PRIMARY KEY ([maNd]),
        CONSTRAINT [FK_BaiGiang_ChuongKhoaHoc] FOREIGN KEY ([maCh]) REFERENCES [ChuongKhoaHoc] ([maCh]) ON DELETE NO ACTION,
        CONSTRAINT [FK_BaiGiang_LoaiNoiDung] FOREIGN KEY ([maLoaiNd]) REFERENCES [LoaiNoiDung] ([maLoaiNd]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503094708_cap')
BEGIN
    CREATE INDEX [IX_NoiDung_maCh] ON [NoiDung] ([maCh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503094708_cap')
BEGIN
    CREATE INDEX [IX_NoiDung_maLoaiNd] ON [NoiDung] ([maLoaiNd]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503094708_cap')
BEGIN
    ALTER TABLE [Video] ADD CONSTRAINT [FK_Video_NoiDung] FOREIGN KEY ([maNd]) REFERENCES [NoiDung] ([maNd]) ON DELETE NO ACTION;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503094708_cap')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240503094708_cap', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503165039_capnhatVideo')
BEGIN
    DECLARE @var6 sysname;
    SELECT @var6 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Video]') AND [c].[name] = N'videoUlr');
    IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [Video] DROP CONSTRAINT [' + @var6 + '];');
    ALTER TABLE [Video] ALTER COLUMN [videoUlr] varchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240503165039_capnhatVideo')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240503165039_capnhatVideo', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240504110923_capNhatDapAnTracNghiem')
BEGIN
    CREATE TABLE [TracNghiem] (
        [maTrn] varchar(255) NOT NULL,
        [tenCauHoi] nvarchar(255) NULL,
        [maNd] varchar(255) NULL,
        CONSTRAINT [PK_TracNghiem] PRIMARY KEY ([maTrn]),
        CONSTRAINT [FK_TracNghiem_NoiDung] FOREIGN KEY ([maNd]) REFERENCES [NoiDung] ([maNd]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240504110923_capNhatDapAnTracNghiem')
BEGIN
    CREATE TABLE [DapAn] (
        [maDa] varchar(255) NOT NULL,
        [tenDa] nvarchar(255) NULL,
        [ketQua] varchar(255) NULL,
        [maTrn] varchar(255) NULL,
        CONSTRAINT [PK_DapAn] PRIMARY KEY ([maDa]),
        CONSTRAINT [FK_DapAn_TracNghiem] FOREIGN KEY ([maTrn]) REFERENCES [TracNghiem] ([maTrn]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240504110923_capNhatDapAnTracNghiem')
BEGIN
    CREATE INDEX [IX_DapAn_maTrn] ON [DapAn] ([maTrn]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240504110923_capNhatDapAnTracNghiem')
BEGIN
    CREATE INDEX [IX_TracNghiem_maNd] ON [TracNghiem] ([maNd]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240504110923_capNhatDapAnTracNghiem')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240504110923_capNhatDapAnTracNghiem', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240505102710_capNhatHocVien')
BEGIN
    CREATE TABLE [HocVien] (
        [maHv] varchar(255) NOT NULL,
        [hoTen] nvarchar(255) NULL,
        [ngaySinh] date NOT NULL,
        [avata] varchar(max) NULL,
        [email] varchar(255) NULL,
        [sdt] varchar(255) NULL,
        [maNg] varchar(255) NULL,
        CONSTRAINT [PK_HocVien] PRIMARY KEY ([maHv]),
        CONSTRAINT [FK_hocvien_nguoiDung] FOREIGN KEY ([maNg]) REFERENCES [NguoiDung] ([maNg]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240505102710_capNhatHocVien')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_HocVien_maNg] ON [HocVien] ([maNg]) WHERE [maNg] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240505102710_capNhatHocVien')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240505102710_capNhatHocVien', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506154321_gioHangCtGh')
BEGIN
    CREATE TABLE [GioHang] (
        [maGh] varchar(255) NOT NULL,
        [maHv] varchar(255) NULL,
        [tongTien] real NULL,
        CONSTRAINT [PK_GioHang] PRIMARY KEY ([maGh]),
        CONSTRAINT [FK_gioHang_hocVien] FOREIGN KEY ([maGh]) REFERENCES [HocVien] ([maHv]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506154321_gioHangCtGh')
BEGIN
    CREATE TABLE [ChiTietGioHang] (
        [MaKh] varchar(255) NOT NULL,
        [maGh] varchar(255) NULL,
        CONSTRAINT [PK_ChiTietGioHang] PRIMARY KEY ([MaKh]),
        CONSTRAINT [FK_chiTietGioHang_gioHang] FOREIGN KEY ([maGh]) REFERENCES [GioHang] ([maGh]) ON DELETE NO ACTION,
        CONSTRAINT [FK_chiTietGioHang_khoaHoc] FOREIGN KEY ([maGh]) REFERENCES [KhoaHoc] ([maKh]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506154321_gioHangCtGh')
BEGIN
    CREATE INDEX [IX_ChiTietGioHang_maGh] ON [ChiTietGioHang] ([maGh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506154321_gioHangCtGh')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240506154321_gioHangCtGh', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506170456_capCtgh')
BEGIN
    ALTER TABLE [ChiTietGioHang] ADD [donGia] real NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506170456_capCtgh')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240506170456_capCtgh', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506185431_capNhatGioHang')
BEGIN
    ALTER TABLE [GioHang] DROP CONSTRAINT [FK_gioHang_hocVien];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506185431_capNhatGioHang')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_GioHang_maHv] ON [GioHang] ([maHv]) WHERE [maHv] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506185431_capNhatGioHang')
BEGIN
    ALTER TABLE [GioHang] ADD CONSTRAINT [FK_gioHang_hocVien] FOREIGN KEY ([maHv]) REFERENCES [HocVien] ([maHv]) ON DELETE NO ACTION;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506185431_capNhatGioHang')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240506185431_capNhatGioHang', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506190111_capNhatCtgh')
BEGIN
    ALTER TABLE [ChiTietGioHang] DROP CONSTRAINT [FK_chiTietGioHang_khoaHoc];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506190111_capNhatCtgh')
BEGIN
    EXEC sp_rename N'[ChiTietGioHang].[MaKh]', N'maKh', N'COLUMN';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506190111_capNhatCtgh')
BEGIN
    ALTER TABLE [ChiTietGioHang] ADD CONSTRAINT [FK_chiTietGioHang_khoaHoc] FOREIGN KEY ([maKh]) REFERENCES [KhoaHoc] ([maKh]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240506190111_capNhatCtgh')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240506190111_capNhatCtgh', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240507162146_hdCthd')
BEGIN
    CREATE TABLE [HoaDon] (
        [maHd] varchar(255) NOT NULL,
        [maHv] varchar(255) NULL,
        [tongTien] real NULL,
        [ngayThanhToan] date NOT NULL,
        CONSTRAINT [PK_HoaDon] PRIMARY KEY ([maHd]),
        CONSTRAINT [FK_HoaDon_HocVien] FOREIGN KEY ([maHd]) REFERENCES [HocVien] ([maHv]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240507162146_hdCthd')
BEGIN
    CREATE TABLE [ChiTietHoaDon] (
        [maKh] varchar(255) NOT NULL,
        [maHd] varchar(255) NULL,
        [donGia] real NULL,
        CONSTRAINT [PK_ChiTietHoaDon] PRIMARY KEY ([maKh]),
        CONSTRAINT [FK_ChiTietHoaDons_HoaDon] FOREIGN KEY ([maHd]) REFERENCES [HoaDon] ([maHd]) ON DELETE NO ACTION,
        CONSTRAINT [FK_ChiTietHoaDons_KhoaHoc] FOREIGN KEY ([maKh]) REFERENCES [KhoaHoc] ([maKh]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240507162146_hdCthd')
BEGIN
    CREATE INDEX [IX_ChiTietHoaDon_maHd] ON [ChiTietHoaDon] ([maHd]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240507162146_hdCthd')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240507162146_hdCthd', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240507191216_capNhatLoi')
BEGIN
    ALTER TABLE [HoaDon] DROP CONSTRAINT [FK_HoaDon_HocVien];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240507191216_capNhatLoi')
BEGIN
    CREATE INDEX [IX_HoaDon_maHv] ON [HoaDon] ([maHv]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240507191216_capNhatLoi')
BEGIN
    ALTER TABLE [HoaDon] ADD CONSTRAINT [FK_HoaDon_HocVien] FOREIGN KEY ([maHv]) REFERENCES [HocVien] ([maHv]) ON DELETE NO ACTION;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240507191216_capNhatLoi')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240507191216_capNhatLoi', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240515023140_themKhoaHocDaMua')
BEGIN
    ALTER TABLE [Video] ADD [thoiLuongVideo] nvarchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240515023140_themKhoaHocDaMua')
BEGIN
    CREATE TABLE [KhoaHocDaMua] (
        [maHv] varchar(255) NOT NULL,
        [maKh] varchar(255) NULL,
        [tienTrinh] nvarchar(max) NULL,
        CONSTRAINT [PK_KhoaHocDaMua] PRIMARY KEY ([maHv]),
        CONSTRAINT [FK_KhoaHocDaMuas_HoaDon] FOREIGN KEY ([maKh]) REFERENCES [KhoaHoc] ([maKh]) ON DELETE NO ACTION,
        CONSTRAINT [FK_KhoaHocDaMuas_KhoaHoc] FOREIGN KEY ([maKh]) REFERENCES [HocVien] ([maHv]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240515023140_themKhoaHocDaMua')
BEGIN
    CREATE INDEX [IX_KhoaHocDaMua_maKh] ON [KhoaHocDaMua] ([maKh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240515023140_themKhoaHocDaMua')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240515023140_themKhoaHocDaMua', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240516090234_capNhatKhDaMua')
BEGIN
    ALTER TABLE [KhoaHocDaMua] DROP CONSTRAINT [FK_KhoaHocDaMuas_KhoaHoc];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240516090234_capNhatKhDaMua')
BEGIN
    ALTER TABLE [KhoaHocDaMua] ADD CONSTRAINT [FK_KhoaHocDaMuas_KhoaHoc] FOREIGN KEY ([maHv]) REFERENCES [HocVien] ([maHv]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240516090234_capNhatKhDaMua')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240516090234_capNhatKhDaMua', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082549_c')
BEGIN
    ALTER TABLE [KhoaHocDaMua] DROP CONSTRAINT [FK_KhoaHocDaMuas_HoaDon];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082549_c')
BEGIN
    ALTER TABLE [KhoaHocDaMua] DROP CONSTRAINT [PK_KhoaHocDaMua];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082549_c')
BEGIN
    DROP INDEX [IX_KhoaHocDaMua_maKh] ON [KhoaHocDaMua];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082549_c')
BEGIN
    DECLARE @var7 sysname;
    SELECT @var7 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[KhoaHocDaMua]') AND [c].[name] = N'maKh');
    IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [KhoaHocDaMua] DROP CONSTRAINT [' + @var7 + '];');
    ALTER TABLE [KhoaHocDaMua] ALTER COLUMN [maKh] varchar(255) NOT NULL;
    ALTER TABLE [KhoaHocDaMua] ADD DEFAULT '' FOR [maKh];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082549_c')
BEGIN
    ALTER TABLE [KhoaHocDaMua] ADD CONSTRAINT [PK_KhoaHocDaMua] PRIMARY KEY ([maKh], [maHv]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082549_c')
BEGIN
    CREATE INDEX [IX_KhoaHocDaMua_maHv] ON [KhoaHocDaMua] ([maHv]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082549_c')
BEGIN
    ALTER TABLE [KhoaHocDaMua] ADD CONSTRAINT [FK_KhoaHocDaMuas_HoaDon] FOREIGN KEY ([maKh]) REFERENCES [KhoaHoc] ([maKh]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082549_c')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240517082549_c', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    ALTER TABLE [ChiTietGioHang] DROP CONSTRAINT [FK_chiTietGioHang_gioHang];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    ALTER TABLE [ChiTietHoaDon] DROP CONSTRAINT [FK_ChiTietHoaDons_HoaDon];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    ALTER TABLE [ChiTietHoaDon] DROP CONSTRAINT [PK_ChiTietHoaDon];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    DROP INDEX [IX_ChiTietHoaDon_maHd] ON [ChiTietHoaDon];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    ALTER TABLE [ChiTietGioHang] DROP CONSTRAINT [PK_ChiTietGioHang];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    DROP INDEX [IX_ChiTietGioHang_maGh] ON [ChiTietGioHang];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    DECLARE @var8 sysname;
    SELECT @var8 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ChiTietHoaDon]') AND [c].[name] = N'maHd');
    IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [ChiTietHoaDon] DROP CONSTRAINT [' + @var8 + '];');
    ALTER TABLE [ChiTietHoaDon] ALTER COLUMN [maHd] varchar(255) NOT NULL;
    ALTER TABLE [ChiTietHoaDon] ADD DEFAULT '' FOR [maHd];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    DECLARE @var9 sysname;
    SELECT @var9 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ChiTietGioHang]') AND [c].[name] = N'maGh');
    IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [ChiTietGioHang] DROP CONSTRAINT [' + @var9 + '];');
    ALTER TABLE [ChiTietGioHang] ALTER COLUMN [maGh] varchar(255) NOT NULL;
    ALTER TABLE [ChiTietGioHang] ADD DEFAULT '' FOR [maGh];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    ALTER TABLE [ChiTietHoaDon] ADD CONSTRAINT [PK_ChiTietHoaDon] PRIMARY KEY ([maHd], [maKh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    ALTER TABLE [ChiTietGioHang] ADD CONSTRAINT [PK_ChiTietGioHang] PRIMARY KEY ([maGh], [maKh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    CREATE INDEX [IX_ChiTietHoaDon_maKh] ON [ChiTietHoaDon] ([maKh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    CREATE INDEX [IX_ChiTietGioHang_maKh] ON [ChiTietGioHang] ([maKh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    ALTER TABLE [ChiTietGioHang] ADD CONSTRAINT [FK_chiTietGioHang_gioHang] FOREIGN KEY ([maGh]) REFERENCES [GioHang] ([maGh]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    ALTER TABLE [ChiTietHoaDon] ADD CONSTRAINT [FK_ChiTietHoaDons_HoaDon] FOREIGN KEY ([maHd]) REFERENCES [HoaDon] ([maHd]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240517082804_cc')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240517082804_cc', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240518112648_capNhatDanhGiaKhoaHoc')
BEGIN
    CREATE TABLE [DanhGiaKhoaHoc] (
        [maDanhGia] nvarchar(450) NOT NULL,
        [maHv] varchar(255) NULL,
        [maKh] varchar(255) NULL,
        [noiDung] nvarchar(max) NULL,
        [soSao] int NULL,
        [ngayDg] date NOT NULL,
        CONSTRAINT [PK_DanhGiaKhoaHoc] PRIMARY KEY ([maDanhGia]),
        CONSTRAINT [FK_DanhGiaKhoaHoc_HocVien] FOREIGN KEY ([maHv]) REFERENCES [HocVien] ([maHv]) ON DELETE NO ACTION,
        CONSTRAINT [FK_DanhGiaKhoaHoc_KhoaHoa] FOREIGN KEY ([maKh]) REFERENCES [KhoaHoc] ([maKh]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240518112648_capNhatDanhGiaKhoaHoc')
BEGIN
    CREATE INDEX [IX_DanhGiaKhoaHoc_maHv] ON [DanhGiaKhoaHoc] ([maHv]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240518112648_capNhatDanhGiaKhoaHoc')
BEGIN
    CREATE INDEX [IX_DanhGiaKhoaHoc_maKh] ON [DanhGiaKhoaHoc] ([maKh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240518112648_capNhatDanhGiaKhoaHoc')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240518112648_capNhatDanhGiaKhoaHoc', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240523093936_capNhatTienTrinh')
BEGIN
    DECLARE @var10 sysname;
    SELECT @var10 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[KhoaHocDaMua]') AND [c].[name] = N'tienTrinh');
    IF @var10 IS NOT NULL EXEC(N'ALTER TABLE [KhoaHocDaMua] DROP CONSTRAINT [' + @var10 + '];');
    ALTER TABLE [KhoaHocDaMua] ALTER COLUMN [tienTrinh] int NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240523093936_capNhatTienTrinh')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240523093936_capNhatTienTrinh', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240524121942_capNhatGiamGia')
BEGIN
    CREATE TABLE [GiamGia] (
        [maGg] varchar(255) NOT NULL,
        [phanTramGiam] real NULL,
        [maGv] varchar(255) NULL,
        CONSTRAINT [PK_GiamGia] PRIMARY KEY ([maGg]),
        CONSTRAINT [FK_GiamGia_GiangVien] FOREIGN KEY ([maGv]) REFERENCES [GiangVien] ([maGv]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240524121942_capNhatGiamGia')
BEGIN
    CREATE INDEX [IX_GiamGia_maGv] ON [GiamGia] ([maGv]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240524121942_capNhatGiamGia')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240524121942_capNhatGiamGia', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240525021327_capNhatBanGiamGia')
BEGIN
    ALTER TABLE [GiamGia] ADD [ghiChu] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240525021327_capNhatBanGiamGia')
BEGIN
    ALTER TABLE [GiamGia] ADD [ngayTao] date NOT NULL DEFAULT '0001-01-01';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240525021327_capNhatBanGiamGia')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240525021327_capNhatBanGiamGia', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240526040626_capnhatdatetime')
BEGIN
    DECLARE @var11 sysname;
    SELECT @var11 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[GiamGia]') AND [c].[name] = N'ngayTao');
    IF @var11 IS NOT NULL EXEC(N'ALTER TABLE [GiamGia] DROP CONSTRAINT [' + @var11 + '];');
    ALTER TABLE [GiamGia] ALTER COLUMN [ngayTao] datetime NOT NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240526040626_capnhatdatetime')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240526040626_capnhatdatetime', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240526141617_capnhatKhCTGG')
BEGIN
    ALTER TABLE [KhoaHoc] ADD [giaGiam] real NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240526141617_capnhatKhCTGG')
BEGIN
    CREATE TABLE [ChiTietGiamGia] (
        [maGg] varchar(255) NOT NULL,
        [maKh] varchar(255) NOT NULL,
        [ngayBatDau] date NOT NULL,
        [ngayKetThuc] date NOT NULL,
        CONSTRAINT [PK_ChiTietGiamGia] PRIMARY KEY ([maKh], [maGg]),
        CONSTRAINT [FK_chiTietGiamGia_GiamGia] FOREIGN KEY ([maGg]) REFERENCES [GiamGia] ([maGg]) ON DELETE CASCADE,
        CONSTRAINT [FK_ChiTietGiamGia_KhoaHoc_maKh] FOREIGN KEY ([maKh]) REFERENCES [KhoaHoc] ([maKh]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240526141617_capnhatKhCTGG')
BEGIN
    CREATE INDEX [IX_ChiTietGiamGia_maGg] ON [ChiTietGiamGia] ([maGg]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240526141617_capnhatKhCTGG')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240526141617_capnhatKhCTGG', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240529005919_cn')
BEGIN
    DECLARE @var12 sysname;
    SELECT @var12 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[TracNghiem]') AND [c].[name] = N'tenCauHoi');
    IF @var12 IS NOT NULL EXEC(N'ALTER TABLE [TracNghiem] DROP CONSTRAINT [' + @var12 + '];');
    ALTER TABLE [TracNghiem] ALTER COLUMN [tenCauHoi] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240529005919_cn')
BEGIN
    DECLARE @var13 sysname;
    SELECT @var13 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DapAn]') AND [c].[name] = N'tenDa');
    IF @var13 IS NOT NULL EXEC(N'ALTER TABLE [DapAn] DROP CONSTRAINT [' + @var13 + '];');
    ALTER TABLE [DapAn] ALTER COLUMN [tenDa] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240529005919_cn')
BEGIN
    DECLARE @var14 sysname;
    SELECT @var14 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DapAn]') AND [c].[name] = N'ketQua');
    IF @var14 IS NOT NULL EXEC(N'ALTER TABLE [DapAn] DROP CONSTRAINT [' + @var14 + '];');
    ALTER TABLE [DapAn] ALTER COLUMN [ketQua] int NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240529005919_cn')
BEGIN
    ALTER TABLE [DapAn] ADD [giaiThich] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240529005919_cn')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240529005919_cn', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240529011247_cnn')
BEGIN
    EXEC sp_rename N'[DapAn].[ketQua]', N'sttDn', N'COLUMN';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240529011247_cnn')
BEGIN
    ALTER TABLE [TracNghiem] ADD [dapAnDung] int NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240529011247_cnn')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240529011247_cnn', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240530002143_cnnn')
BEGIN
    DROP INDEX [IX_TracNghiem_maNd] ON [TracNghiem];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240530002143_cnnn')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_TracNghiem_maNd] ON [TracNghiem] ([maNd]) WHERE [maNd] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240530002143_cnnn')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240530002143_cnnn', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240611170853_hdbanKh')
BEGIN
    CREATE TABLE [HoaDonBanKh] (
        [maHdKhMua] nvarchar(450) NOT NULL,
        [maGv] varchar(255) NULL,
        [maKh] varchar(255) NULL,
        [donGia] real NULL,
        [ngayMua] date NOT NULL,
        CONSTRAINT [PK_HoaDonBanKh] PRIMARY KEY ([maHdKhMua]),
        CONSTRAINT [FK_HoaDonBanKh_GiangVien] FOREIGN KEY ([maGv]) REFERENCES [GiangVien] ([maGv]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240611170853_hdbanKh')
BEGIN
    CREATE INDEX [IX_HoaDonBanKh_maGv] ON [HoaDonBanKh] ([maGv]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240611170853_hdbanKh')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240611170853_hdbanKh', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612040752_updatekh')
BEGIN
    ALTER TABLE [KhoaHoc] ADD [ngayTao] date NOT NULL DEFAULT '0001-01-01';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612040752_updatekh')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240612040752_updatekh', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612041842_ss')
BEGIN
    ALTER TABLE [HoaDonBanKh] ADD [loiNhuanThuDc] real NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612041842_ss')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240612041842_ss', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612052142_capNhaHd')
BEGIN
    CREATE INDEX [IX_HoaDonBanKh_maKh] ON [HoaDonBanKh] ([maKh]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612052142_capNhaHd')
BEGIN
    ALTER TABLE [HoaDonBanKh] ADD CONSTRAINT [FK_HoaDonBanKh_KhoaHoc] FOREIGN KEY ([maKh]) REFERENCES [KhoaHoc] ([maKh]) ON DELETE NO ACTION;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612052142_capNhaHd')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240612052142_capNhaHd', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612052525_xoa')
BEGIN
    ALTER TABLE [HoaDonBanKh] DROP CONSTRAINT [FK_HoaDonBanKh_KhoaHoc];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612052525_xoa')
BEGIN
    DROP INDEX [IX_HoaDonBanKh_maKh] ON [HoaDonBanKh];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612052525_xoa')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240612052525_xoa', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612122359_ud')
BEGIN
    CREATE TABLE [ThongTinThanhToan] (
        [maTt] nvarchar(450) NOT NULL,
        [tenNganHang] varchar(255) NULL,
        [logoNganHang] varchar(255) NULL,
        [stk] varchar(255) NULL,
        [nguoiThuHuong] varchar(255) NULL,
        [maGv] varchar(255) NULL,
        CONSTRAINT [PK_ThongTinThanhToan] PRIMARY KEY ([maTt]),
        CONSTRAINT [FK_thongTinThanhToan_giangVien] FOREIGN KEY ([maGv]) REFERENCES [GiangVien] ([maGv]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612122359_ud')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_ThongTinThanhToan_maGv] ON [ThongTinThanhToan] ([maGv]) WHERE [maGv] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612122359_ud')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240612122359_ud', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612124150_xxxx')
BEGIN
    CREATE TABLE [LichSuThanhToan] (
        [maLs] nvarchar(450) NOT NULL,
        [donGiaRut] real NULL,
        [ngayRut] date NOT NULL,
        [ngayThanhToan] date NOT NULL,
        [trangThai] varchar(255) NULL,
        [maGv] varchar(255) NULL,
        CONSTRAINT [PK_LichSuThanhToan] PRIMARY KEY ([maLs]),
        CONSTRAINT [FK_lichSuThanhToans_GiangVien] FOREIGN KEY ([maGv]) REFERENCES [GiangVien] ([maGv]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612124150_xxxx')
BEGIN
    CREATE TABLE [LoiNhuanGiangVien] (
        [maLoiNhuan] nvarchar(450) NOT NULL,
        [maGv] varchar(255) NULL,
        [tongLoiNhuan] real NULL,
        CONSTRAINT [PK_LoiNhuanGiangVien] PRIMARY KEY ([maLoiNhuan]),
        CONSTRAINT [FK_LoiNhuanGiangVien_giangVien] FOREIGN KEY ([maGv]) REFERENCES [GiangVien] ([maGv]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612124150_xxxx')
BEGIN
    CREATE INDEX [IX_LichSuThanhToan_maGv] ON [LichSuThanhToan] ([maGv]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612124150_xxxx')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_LoiNhuanGiangVien_maGv] ON [LoiNhuanGiangVien] ([maGv]) WHERE [maGv] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612124150_xxxx')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240612124150_xxxx', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612151931_ssssss')
BEGIN
    ALTER TABLE [HoaDonBanKh] ADD [tenHv] nvarchar(255) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20240612151931_ssssss')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240612151931_ssssss', N'5.0.17');
END;
GO

COMMIT;
GO

