---
title: 'Arch Linux install with BTRFS encryption'
date: "1/4/24"
author: "Chris Pro Hosting"
description: "Tutorial for a minimal Arch install with BTRFS encryption"
image:
    url: '/assets/image(11).png'
    alt: 'AI generated image of an open SSD in the dark'
layout: ../../layouts/BlogLayout.astro
draft: false
---

> *Editors note: This documentation was written by a friend during the Summer of 2023 (hence why I made him the author). These commands were transcribed directly from a YouTube video (which will be linked once that video is found). Parts of this document is edited by me for accuracy, continuity, and formatting with this site.*

## Formatting Partitions and LUKS

- boot into the install iso
- `fdisk /dev/sda` or whatever your drive is (vda, nvme0n1, etc.)
	- create 3 partitions
		- EFI
			- 256M
			```
			fdisk
			n
			(enter)
			(enter)
			+256M
			t
			1
			```
		- boot
			- 512M
			```
			fdisk
			n
			(enter)
			(enter)
			+512M
			```
		- swap (optional depending on circumstances)
			- Size of ram
			- 16GB
			```
			fdisk
			n
			(enter)
			(enter)
			+16G
			t
			19
			```
		- root (doesnt matter what type, will be overridden)
			- fill the rest of the drive
			- this will be btrfs post encryption setup
			```
			fdisk
			n
			(enter)
			(enter)
			(enter)
			```
		Write the changes using the `w` command.
```bash
mkfs.vfat -n "EFI System" /dev/sda1
mkfs.ext4 -L "boot" /dev/sda2
mkswap /dev/sda3
modprobe dm-crypt
modprobe dm-mod
cryptsetup luksFormat -v -s 512 -h sha512 /dev/sda4
# Type YES
# Enter password
cryptsetup open /dev/sda4 archlinux
mkfs.btrfs -L "root" /dev/mapper/archlinux
```
## Setting up BTRFS and Mounting drives
```bash
mount -t btrfs /dev/mapper/archlinux /mnt
cd /mnt
btrfs su cr @
btrfs su cr @home
cd /
unmount /mnt

mount -t btrfs -o subvol=@ /dev/mapper/archlinux /mnt
mkdir /mnt/home
mount -t btrfs -o subvol=@home /dev/mapper/archlinux /mnt/home
mkdir /mnt/boot
mount /dev/nvme0n1p2 /mnt/boot
mkdir /mnt/boot/efi
mount /dev/nvme0n1p1 /mnt/boot/efi
swapon /dev/sda3
```
## Install Arch

  ```bash
  pacstrap -i /mnt base base-devel networkmanager efibootmgr grub neovim sudo vi vim linux linux-firmware linux-headers cronie
  genfstab -U /mnt > /mnt/etc/fstab
  arch-chroot /mnt
  nvim /etc/locale.gen #uncomment en_US UTF8
  locale-gen
  echo LANG=en_US > /etc/locale.conf
  ln -sf /usr/share/zoneinfo/America/Detroit /etc/localtime
  hwclock --systohc --utc # enables the HW Clock
  echo Arch > /etc/hostname # set the hostname
  echo 127.0.0.1 localhost arch >> /etc/hosts # fill the hosts file
  echo ::1 localhost arch >> /etc/hosts # ~
  nvim /etc/default/grub
  # GRUB_CMDLINE_LINUX="cryptdevice=/dev/sda4:archlinux:allow-discards"
  ```

>Editors note: You may want to change the `GRUB_CMDLINE_LINUX` entry in the future for `cryptdevice` to support Partition UUIDs, or else the system will not boot if the configuration changes.

```bash
  nvim /etc/mkinitcpio.conf
  # HOOKS=([appent between blocks and filesystem with "encrypt"])
  mkinitcpio -p linux
  grub-install --boot-directory=/boot --efi-directory=/boot/efi /dev/sda2
  grub-mkconfig -o /boot/grub/grub.cfg
  grub-mkconfig -o /boot/efi/EFI/arch/grub.cfg
  
  systemctl enable NetworkManager
  passwd
  
  reboot
  ```
This finished the arch install. now when you reboot, you will be prompted to enter a password to decrypt the btrfs partition
## Post install
	```bash
	useradd -m -d /home/archuser archuser
	passwd archuser
	sudo groupadd sudo
	sudo pacman -Syu
	sudo pacman -Sy plasma plasma-wayland-session plasma-applications kitty git --needed
	systemctl enable sddm
	cd /tmp
	git clone https://aur.archlinux.org/yay-bin.git
	cd yay-bin
	makepkg -si
	yay -S timeshift-bin
	```
This is all you need for a fully functioning desktop
## TPM 2.0 and LUKS (WIP)
- `cat /sys/class/tpm/tpm0/tpm_version_major`
	- if this returns 2.0, then you are good
- [Reddit Tutorial](https://www.reddit.com/r/Fedora/comments/szlvwd/psa_if_you_have_a_luks_encrypted_system_and_a/)
- [Arch Wiki](https://wiki.archlinux.org/title/Trusted_Platform_Module)
