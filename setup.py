from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in gama/__init__.py
from gama import __version__ as version

setup(
	name="gama",
	version=version,
	description="Frappe Customizations for Gama Reklam San. ve Tic. A.Ş.",
	author="Gama Reklam San. ve Tic.",
	author_email="administrator@gamareklam.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
