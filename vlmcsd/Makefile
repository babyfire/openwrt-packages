# SPDX-License-Identifier: GPL-3.0-only
#
# Copyright (C) 2022 ImmortalWrt.org

include $(TOPDIR)/rules.mk

PKG_NAME:=vlmcsd
PKG_VERSION:=svn1113
PKG_RELEASE:=1

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/Wind4/vlmcsd.git
PKG_SOURCE_DATE:=2020-03-30
PKG_SOURCE_VERSION:=e599080486478e219cd065e141d6de050a450c27
PKG_MIRROR_HASH:=0daa66c27aa917db13b26d444f04d73ea16925ef021405f5dd6e11ff9f9d034f

PKG_MAINTAINER:=babyfire <ieric@163.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_PARALLEL:=1

include $(INCLUDE_DIR)/package.mk

define Package/vlmcsd
	SECTION:=net
	CATEGORY:=Network
	TITLE:=vlmcsd for OpenWRT
	URL:=https://github.com/Wind4/vlmcsd
	DEPENDS:=+libpthread
endef

define Package/vlmcsd/description
	KMS Emulator in C.
endef

define Package/vlmcsd/conffiles
	/etc/config/vlmcsd
	/etc/vlmcsd/vlmcsd.ini
	/etc/vlmcsd/vlmcsd.kmd
endef

define Package/vlmcsd/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/bin/vlmcsd $(1)/usr/bin/vlmcsd
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/bin/vlmcs $(1)/usr/bin/vlmcs

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/vlmcsd $(1)/etc/config/vlmcsd

	$(INSTALL_DIR) $(1)/etc/vlmcsd
	$(INSTALL_CONF) ./files/vlmcsd.ini $(1)/etc/vlmcsd/vlmcsd.ini
	$(INSTALL_CONF) $(PKG_BUILD_DIR)/etc/vlmcsd.kmd $(1)/etc/vlmcsd/vlmcsd.kmd

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/vlmcsd.init $(1)/etc/init.d/vlmcsd
endef

$(eval $(call BuildPackage,vlmcsd))